package main

import (
  "bytes"
  "encoding/json"
  "math/rand"
  "net"
  "sort"
  "strconv"
  "time"
  "github.com/mrfelfel/rayda-badam/src/gopool"
  "github.com/gobwas/ws"
  "github.com/gobwas/ws/wsutil"
)

func (u *User) Receive() error {
  req, err := u.readRequest()
  if err != nil { u.conn.Close(); return err }
  if req == nil { return nil }
  switch req.Method {
  case "handshake":
    return u.writeResultTo(req, Object{"app": Object{"status": "ok"}})
  case "auth":
    return u.writeResultTo(req, Object{"user": Object{"authed": true}})
  case "send":
    req.Params["author"] = u.name; req.Params["time"] = time.Now().UnixMilli()
    u.rayconnect.SendTo(req.Params["name"].(string), req.Params)
    return u.writeNotice("approve", Object{"message": "sended"})
  default:
    return u.writeErrorTo(req, Object{"error": "not implemented"})
  }
}

func (u *User) readRequest() (*Request, error) {
  u.io.Lock(); defer u.io.Unlock()
  h, r, err := wsutil.NextReader(u.conn, ws.StateServerSide)
  if err != nil { return nil, err }
  if h.OpCode.IsControl() { return nil, wsutil.ControlFrameHandler(u.conn, ws.StateServerSide)(h, r) }
  req := &Request{}; json.NewDecoder(r).Decode(req); return req, nil
}

func (u *User) writeErrorTo(req *Request, err Object) error { return u.write(Error{ID: req.ID, Error: err}) }
func (u *User) writeResultTo(req *Request, res Object) error { return u.write(Response{ID: req.ID, Result: res}) }
func (u *User) writeNotice(m string, p Object) error { return u.write(Request{Method: m, Params: p}) }
func (u *User) write(x interface{}) error {
  w := wsutil.NewWriter(u.conn, ws.StateServerSide, ws.OpText)
  u.io.Lock(); defer u.io.Unlock()
  json.NewEncoder(w).Encode(x); return w.Flush()
}
func (u *User) writeRaw(p []byte) error { u.io.Lock(); defer u.io.Unlock(); _, e := u.conn.Write(p); return e }

func NewRayconnect(pool *gopool.Pool) *Rayconnect {
  rc := &Rayconnect{pool: pool, ns: make(map[string]*User), out: make(chan []byte, 256)}
  go rc.writer(); return rc
}

func (c *Rayconnect) Register(conn net.Conn) *User {
  u := &User{rayconnect: c, conn: conn}
  c.mu.Lock()
  u.id = c.seq; u.name = iranians[rand.Intn(len(iranians))]; c.us = append(c.us, u); c.ns[u.name] = u; c.seq++
  c.mu.Unlock()
  u.writeNotice("hello", Object{"name": u.name})
  c.Broadcast("greet", Object{"name": u.name, "time": time.Now().UnixMilli()})
  return u
}

func (c *Rayconnect) Remove(u *User) {
  c.mu.Lock(); delete(c.ns, u.name)
  i := sort.Search(len(c.us), func(i int) bool { return c.us[i].id >= u.id })
  c.us = append(c.us[:i], c.us[i+1:]...); c.mu.Unlock()
  c.Broadcast("goodbye", Object{"name": u.name})
}

func (c *Rayconnect) SendTo(name string, params Object) bool {
  var buf bytes.Buffer; w := wsutil.NewWriter(&buf, ws.StateServerSide, ws.OpText)
  json.NewEncoder(w).Encode(Request{Method: "pv_send", Params: params}); w.Flush()
  c.mu.Lock(); defer c.mu.Unlock()
  if u, has := c.ns[name]; has { c.pool.Schedule(func() { u.writeRaw(buf.Bytes()) }); return true }
  return false
}

func (c *Rayconnect) Broadcast(m string, p Object) {
  var buf bytes.Buffer; w := wsutil.NewWriter(&buf, ws.StateServerSide, ws.OpText)
  json.NewEncoder(w).Encode(Request{Method: m, Params: p}); w.Flush()
  c.out <- buf.Bytes()
}

func (c *Rayconnect) writer() {
  for b := range c.out {
    c.mu.RLock(); us := c.us; c.mu.RUnlock()
    for _, u := range us { u := u; c.pool.Schedule(func() { u.writeRaw(b) }) }
  }
}

func (c *Rayconnect) randName() string {
  for { n := iranians[rand.Intn(len(iranians))]; if _, has := c.ns[n]; !has { return n } }
}

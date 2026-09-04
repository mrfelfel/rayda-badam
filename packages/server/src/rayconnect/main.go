package main

import (
  "flag"
  "log"
  "net"
  "net/http"
  "time"
  "github.com/mrfelfel/rayda-badam/src/gopool"
  "github.com/gobwas/ws"
  "github.com/mailru/easygo/netpoll"
  _ "github.com/mrfelfel/rayda-badam/src/rayconnect/db"
)

var (
  addr = flag.String("listen", ":3333", "address to bind to")
  workers = flag.Int("workers", 256, "max workers")
  ioTimeout = flag.Duration("io_timeout", 200*time.Millisecond, "i/o timeout")
)

func main() {
  flag.Parse()
  poller, _ := netpoll.New(nil)
  pool := gopool.NewPool(*workers, 1, 1)
  rc := NewRayconnect(pool)

  handle := func(conn net.Conn) {
    sc := deadliner{conn, *ioTimeout}
    _, err := ws.Upgrade(sc)
    if err != nil { conn.Close(); return }
    user := rc.Register(sc)
    desc := netpoll.Must(netpoll.HandleRead(conn))
    poller.Start(desc, func(ev netpoll.Event) {
      if ev&(netpoll.EventReadHup|netpoll.EventHup) != 0 {
        poller.Stop(desc); rc.Remove(user); return
      }
      pool.Schedule(func() {
        if err := user.Receive(); err != nil { poller.Stop(desc); rc.Remove(user) }
      })
    })
  }

  ln, _ := net.Listen("tcp", *addr)
  log.Printf("websocket listening on %s", ln.Addr())
  acceptDesc := netpoll.Must(netpoll.HandleListener(ln, netpoll.EventRead|netpoll.EventOneShot))
  accept := make(chan error, 1)
  poller.Start(acceptDesc, func(e netpoll.Event) {
    err := pool.ScheduleTimeout(time.Millisecond, func() {
      conn, err := ln.Accept(); if err != nil { accept <- err; return }; accept <- nil; handle(conn)
    })
    if err == nil { err = <-accept }
    if err != nil { time.Sleep(5*time.Millisecond) }
    poller.Resume(acceptDesc)
  })
  select {}
}

type deadliner struct { net.Conn; t time.Duration }
func (d deadliner) Write(p []byte) (int,error) { d.Conn.SetWriteDeadline(time.Now().Add(d.t)); return d.Conn.Write(p) }
func (d deadliner) Read(p []byte) (int,error) { d.Conn.SetReadDeadline(time.Now().Add(d.t)); return d.Conn.Read(p) }

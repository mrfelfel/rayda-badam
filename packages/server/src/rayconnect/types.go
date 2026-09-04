package main

import (
    "io"
    "sync"
    "github.com/mrfelfel/rayda-badam/src/gopool"
    "github.com/mrfelfel/rayda-badam/src/rayconnect/db"
    "github.com/mrfelfel/rayda-badam/src/rayconnect/service"
)

type Object map[string]interface{}

type Request struct {
    ID     int    `json:"id"`
    Method string `json:"method"`
    Params Object `json:"params"`
}

type Response struct {
    ID     int    `json:"id"`
    Result Object `json:"result"`
}

type Error struct {
    ID    int    `json:"id"`
    Error Object `json:"error"`
}

type User struct {
    io              sync.Mutex
    conn            io.ReadWriteCloser
    id              uint
    name            string
    rayconnect      *Rayconnect
    project         *db.App
    authInformation service.AuthInfo
}

type Rayconnect struct {
    mu   sync.RWMutex
    seq  uint
    us   []*User
    ns   map[string]*User
    pool *gopool.Pool
    out  chan []byte
}

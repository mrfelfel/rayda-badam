package gopool

import (
    "errors"
    "sync"
    "time"
)

var ErrScheduleTimeout = errors.New("gopool: schedule timeout")

type Pool struct {
    sem    chan struct{}
    queue  chan func{}
    mu     sync.Mutex
    closed bool
}

func NewPool(size, queue, spawn int) *Pool {
    p := &Pool{
        sem:   make(chan struct{}, size),
        queue: make(chan func(), queue),
    }
    for i := 0; i < spawn; i++ {
        go p.worker()
    }
    return p
}

func (p *Pool) worker() {
    for fn := range p.queue {
        p.sem <- struct{}{}
        fn()
        <-p.sem
    }
}

func (p *Pool) Schedule(task func()) {
    p.mu.Lock()
    if p.closed { p.mu.Unlock(); return }
    p.mu.Unlock()
    p.queue <- task
}

func (p *Pool) ScheduleTimeout(timeout time.Duration, task func()) error {
    t := time.NewTimer(timeout)
    defer t.Stop()
    select {
    case p.queue <- task:
        return nil
    case <-t.C:
        return ErrScheduleTimeout
    }
}

package backend

import (
	"log"
	"net/http"
	"sync"

	"github.com/jawahars16/kubex/watcher"
)

// ServiceHandler ...
func ServiceHandler(w http.ResponseWriter, r *http.Request) {
	socket := NewSocket(w, r)
	var mutex = &sync.Mutex{}

	go watcher.WatchEvents(socket, mutex)
	go watcher.WatchPodMetrics(socket, mutex)
	go watcher.WatchNodes(socket, mutex)
	go watcher.WatchPods(socket, mutex)
	go watcher.WatchServices(socket, mutex)
}

// NodeHandler ...
func NodeHandler(w http.ResponseWriter, r *http.Request) {
	socket := NewSocket(w, r)
	var mutex = &sync.Mutex{}

	go watcher.WatchPodMetrics(socket, mutex)
	go watcher.WatchNodes(socket, mutex)
	go watcher.WatchPods(socket, mutex)
}

// Initialize ...
func Initialize(path string, handler func(w http.ResponseWriter, r *http.Request), addr string) {
	fs := http.FileServer(http.Dir("../frontend/build"))
	http.Handle("/", fs)
	http.HandleFunc(path, handler)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Printf(err.Error())
	}
}

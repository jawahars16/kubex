package backend

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/jawahars16/kubex/watcher"
)

// ServiceHandler ...
func ServiceHandler(namespace string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		socket := NewSocket(w, r)
		var mutex = &sync.Mutex{}
		watcher.WriteMeta("service", socket, mutex)

		go watcher.WatchEvents(socket, mutex)
		go watcher.WatchPodMetrics(socket, mutex)
		go watcher.WatchNodes(socket, mutex)
		go watcher.WatchPods(socket, mutex)
		go watcher.WatchServices(socket, mutex, namespace)
	}
}

// NodeHandler ...
func NodeHandler(namespace string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		socket := NewSocket(w, r)
		var mutex = &sync.Mutex{}
		watcher.WriteMeta("node", socket, mutex)

		go watcher.WatchPodMetrics(socket, mutex)
		go watcher.WatchNodes(socket, mutex)
		go watcher.WatchPods(socket, mutex)
	}
}

// DeploymentHandler ...
func DeploymentHandler(namespace string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		socket := NewSocket(w, r)
		var mutex = &sync.Mutex{}

		go watcher.WatchEvents(socket, mutex)
		go watcher.WatchPodMetrics(socket, mutex)
		go watcher.WatchNodes(socket, mutex)
		go watcher.WatchPods(socket, mutex)
		go watcher.WatchDeployments(socket, mutex, namespace)
	}
}

func metaHandler(resource string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		socket := NewSocket(w, r)
		var mutex = &sync.Mutex{}
		watcher.WriteMeta(resource, socket, mutex)
	}
}

// Initialize ...
func Initialize(
	path string,
	handler func(namespace string) func(w http.ResponseWriter, r *http.Request),
	addr string,
	namespace string) {

	fs := http.FileServer(http.Dir("./frontend/build/"))
	http.Handle("/", fs)
	http.HandleFunc(fmt.Sprintf("/%s", path), handler(namespace))
	http.HandleFunc("/meta", metaHandler(path))
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Printf(err.Error())
	}

}

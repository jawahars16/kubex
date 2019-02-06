package backend

import (
	"fmt"
	"net/http"
	"os/exec"
	"runtime"
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

	go func() {
		fmt.Printf("Server started at localhost%s", addr)
		open(fmt.Sprintf("http://localhost%s", addr))
	}()

	panic(http.ListenAndServe(addr, nil))
}

// open opens the specified URL in the default browser of the user.
func open(url string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default: // "linux", "freebsd", "openbsd", "netbsd"
		cmd = "xdg-open"
	}
	args = append(args, url)
	return exec.Command(cmd, args...).Start()
}

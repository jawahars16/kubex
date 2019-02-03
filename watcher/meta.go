package watcher

import (
	"sync"

	"github.com/jawahars16/kubex/infra"
)

// WriteMeta ...
func WriteMeta(resource string, socket infra.Socket, mutex *sync.Mutex) {
	payload := Payload{
		Resource: AppMeta{
			Resource: resource,
		},
		Action: "META",
	}
	mutex.Lock()
	socket.Write(payload)
	mutex.Unlock()
}

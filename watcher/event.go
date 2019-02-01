package watcher

import (
	"sync"

	"github.com/jawahars16/kubex/kube"
	v1 "k8s.io/api/core/v1"

	"github.com/jawahars16/kubex/infra"
)

func mapEvent(event *v1.Event) Payload {
	resource := Event{
		Reason:             event.Reason,
		InvolvedObjectName: event.InvolvedObject.Name,
	}

	return Payload{
		Resource: resource,
		Action:   "EVENT",
	}
}

// WatchEvents ...
func WatchEvents(socket infra.Socket, mutex *sync.Mutex) {
	channel := kube.GetEventsChannel("")
	for event := range channel {
		if event, ok := event.Object.(*v1.Event); ok {
			eventDetail := mapEvent(event)
			mutex.Lock()
			socket.Write(eventDetail)
			mutex.Unlock()
		}
	}
}

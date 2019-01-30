package watcher

import (
	"sync"

	"github.com/jawahars16/kube-monitor/infra"
	"github.com/jawahars16/kube-monitor/kube"
	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
)

func Storage(self v1.ResourceList) *resource.Quantity {
	if val, ok := (self)[v1.ResourceStorage]; ok {
		return &val
	}
	return &resource.Quantity{}
}

func mapNode(node *v1.Node, action string) Payload {
	return Payload{
		Action: action,
		Resource: Node{
			Name:    node.Name,
			CPU:     float64(node.Status.Allocatable.Cpu().MilliValue()),
			Memory:  float64(node.Status.Allocatable.Memory().MilliValue()),
			Storage: float64(Storage(node.Status.Allocatable).MilliValue()),
		},
	}
}

// WatchNodes ...
func WatchNodes(socket infra.Socket, mutex *sync.Mutex) {
	channel := kube.GetNodeChannel()

	for event := range channel {
		if node, ok := event.Object.(*v1.Node); ok {
			nodeDetail := mapNode(node, "NODE_"+string(event.Type))
			mutex.Lock()
			socket.Write(nodeDetail)
			mutex.Unlock()
		}
	}
}

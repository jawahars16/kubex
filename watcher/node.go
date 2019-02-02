package watcher

import (
	"sync"

	"github.com/jawahars16/kubex/infra"
	"github.com/jawahars16/kubex/kube"
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
	readyStatus := false
	for _, condition := range node.Status.Conditions {
		if condition.Type == "Ready" {
			readyStatus = condition.Status == "True"
		}
	}
	return Payload{
		Action: action,
		Resource: Node{
			Name:        node.Name,
			CPU:         float64(node.Status.Allocatable.Cpu().MilliValue()),
			Memory:      float64(node.Status.Allocatable.Memory().MilliValue()),
			ReadyStatus: readyStatus,
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

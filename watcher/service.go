package watcher

import (
	"sync"

	"github.com/jawahars16/kubex/infra"
	"github.com/jawahars16/kubex/kube"
	v1 "k8s.io/api/core/v1"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
)

func mapService(service *v1.Service, action string) Payload {

	ingress := service.Status.LoadBalancer.Ingress
	ip := ""
	if len(ingress) > 0 {
		ip = service.Status.LoadBalancer.Ingress[0].IP
	}

	labelSelector := labels.SelectorFromSet(service.Spec.Selector)
	options := metaV1.ListOptions{LabelSelector: labelSelector.String()}
	pods := kube.GetPodList(service.Namespace, options)

	meta := Meta{
		ID:        string(service.UID),
		Name:      service.Name,
		Namespace: service.Namespace,
		Labels:    service.Labels,
		Created:   service.CreationTimestamp,
	}
	resource := Service{
		Meta:     meta,
		IP:       ip,
		Selector: service.Spec.Selector,
		Pods:     pods,
	}
	return Payload{
		Action:   action,
		Resource: resource,
	}
}

// WatchServices ...
func WatchServices(socket infra.Socket, mutex *sync.Mutex, namespace string) {
	channel := kube.GetServiceChannel(namespace) // TODO: Get namespace from user

	for event := range channel {
		if service, ok := event.Object.(*v1.Service); ok {
			if service.Name != "kubernetes" {
				// Critical Section : Multiple goroutines may write to socket at same time.
				mutex.Lock()
				socket.Write(mapService(service, "SVC_"+string(event.Type)))
				mutex.Unlock()
			}
		}
	}
}

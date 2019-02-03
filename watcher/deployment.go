package watcher

import (
	"sync"

	"github.com/jawahars16/kubex/infra"
	"github.com/jawahars16/kubex/kube"
	"k8s.io/api/apps/v1beta1"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func mapDeployment(deployment *v1beta1.Deployment, action string) Payload {
	meta := Meta{
		ID:        string(deployment.UID),
		Name:      deployment.Name,
		Namespace: deployment.Namespace,
		Labels:    deployment.Labels,
		Created:   deployment.CreationTimestamp,
	}

	selector, err := metaV1.LabelSelectorAsSelector(deployment.Spec.Selector)
	pods := []string{}
	if err == nil {
		options := metaV1.ListOptions{LabelSelector: selector.String()}
		pods = kube.GetPodList(deployment.Namespace, options)
	}

	return Payload{
		Action: action,
		Resource: Deployment{
			Meta: meta,
			Pods: pods,
		},
	}
}

// WatchDeployments ...
func WatchDeployments(socket infra.Socket, mutex *sync.Mutex, namespace string) {
	channel := kube.GetDeploymentChannel(namespace)

	for event := range channel {
		if deployment, ok := event.Object.(*v1beta1.Deployment); ok {
			// Critical Section : Multiple goroutines may write to socket at same time.
			mutex.Lock()
			socket.Write(mapDeployment(deployment, "DEP_"+string(event.Type)))
			mutex.Unlock()
		}
	}
}

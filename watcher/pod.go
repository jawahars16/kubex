package watcher

import (
	"sync"
	"time"

	"github.com/jawahars16/kubex/infra"
	"github.com/jawahars16/kubex/kube"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func addQuantity() {

}

func mapPod(pod *v1.Pod, action string) Payload {
	meta := Meta{
		Name:      pod.Name,
		ID:        string(pod.UID),
		Namespace: pod.Namespace,
		Labels:    pod.ObjectMeta.Labels,
		Created:   pod.CreationTimestamp,
	}

	var cpuRequest float64
	var cpuLimit float64

	var memoryRequest float64
	var memoryLimit float64

	for _, container := range pod.Spec.Containers {
		_cpuRequest := float64(container.Resources.Requests.Cpu().MilliValue())
		_cpuLimit := float64(container.Resources.Limits.Cpu().MilliValue())

		_memoryRequest := float64(container.Resources.Requests.Memory().MilliValue())
		_memoryLimit := float64(container.Resources.Limits.Memory().MilliValue())

		cpuRequest += _cpuRequest
		cpuLimit += _cpuLimit

		memoryRequest += _memoryRequest
		memoryLimit += _memoryLimit
	}

	resource := Pod{
		Meta:   meta,
		Status: pod.Status,
		Request: Resources{
			CPU:    cpuRequest,
			Memory: memoryRequest,
		},
		Limit: Resources{
			CPU:    cpuLimit,
			Memory: memoryLimit,
		},
		Node: pod.Spec.NodeName,
	}
	return Payload{
		Resource: resource,
		Action:   action,
	}
}

// WatchPods ...
func WatchPods(socket infra.Socket, mutex *sync.Mutex) {
	channel := kube.GetPodChannel(metav1.ListOptions{}, "") // TODO: Get namespace from user
	for event := range channel {
		if pod, ok := event.Object.(*v1.Pod); ok {
			podDetail := mapPod(pod, "POD_"+string(event.Type))
			mutex.Lock()
			socket.Write(podDetail)
			mutex.Unlock()
		}
	}
}

// WatchPodMetrics ...
func WatchPodMetrics(socket infra.Socket, mutex *sync.Mutex) {
	ticker := time.NewTicker(time.Millisecond * 1000 * 3) // TODO: Get poll interval from user

	writePodMetrics(socket, mutex)
	for range ticker.C {
		writePodMetrics(socket, mutex)
	}
}

func writePodMetrics(socket infra.Socket, mutex *sync.Mutex) {

	list, err := kube.GetPodMetrics()

	if err != nil {
		payload := Payload{
			Action: "METRICS_ERROR",
			Resource: PodMetrics{
				Error: err.Error(),
			},
		}
		mutex.Lock()
		socket.Write(payload)
		mutex.Unlock()
	}

	for _, pod := range list {
		cpuUsage := 0.0
		memoryUsage := 0.0

		podContainers := pod.Containers
		for _, container := range podContainers {
			cpuQuantity := float64(container.Usage.Cpu().MilliValue())
			memQuantity := float64(container.Usage.Memory().MilliValue())
			cpuUsage += cpuQuantity
			memoryUsage += memQuantity
		}

		payload := Payload{
			Action: "METRICS",
			Resource: PodMetrics{
				Pod:    pod.Name,
				CPU:    cpuUsage,
				Memory: memoryUsage,
			},
		}

		mutex.Lock()
		socket.Write(payload)
		mutex.Unlock()
	}
}

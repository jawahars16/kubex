package watcher

import (
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type Meta struct {
	ID        string            `json:"id,omitempty"`
	Name      string            `json:"name,omitempty"`
	Namespace string            `json:"namespace,omitempty"`
	Labels    map[string]string `json:"labels,omitempty"`
	Created   metav1.Time       `json:"created,omitempty"`
}

type Resources struct {
	CPU    float64 `json:"cpu"`
	Memory float64 `json:"memory"`
}

type Payload struct {
	Resource interface{} `json:"resource,omitempty"`
	Action   string      `json:"action,omitempty"`
}

type Event struct {
	Reason             string `json:"reason,omitempty"`
	InvolvedObjectName string `json:"involved_object_name,omitempty"`
}

type Service struct {
	Meta     `json:"meta,omitempty"`
	Selector map[string]string `json:"selector,omitempty"`
	Pods     []string          `json:"pods,omitempty"`
	IP       string            `json:"ip,omitempty"`
}

type Pod struct {
	Meta    `json:"meta,omitempty"`
	Status  v1.PodStatus `json:"status,omitempty"`
	Request Resources    `json:"request,omitempty"`
	Limit   Resources    `json:"limit,omitempty"`
	Usage   Resources    `json:"usage,omitempty"`
	Service string       `json:"service,omitempty"`
	Node    string       `json:"node,omitempty"`
}

type Node struct {
	Name        string  `json:"name,omitempty"`
	CPU         float64 `json:"cpu"`
	Memory      float64 `json:"memory"`
	ReadyStatus bool    `json:"readyStatus"`
}

type PodMetrics struct {
	Pod    string  `json:"pod,omitempty"`
	CPU    float64 `json:"cpu"`
	Memory float64 `json:"memory"`
	Error  string  `json:"error,omitempty"`
}

type Deployment struct {
	Meta `json:"meta,omitempty"`
	Pods []string `json:"pods,omitempty"`
}

type AppMeta struct {
	Resource string `json:"resource,omitempty"`
}

package infra

import (
	corev1 "k8s.io/client-go/kubernetes/typed/core/v1"
)

type KubeClient interface {
	CoreV1() corev1.CoreV1Interface
}

// Socket ...
type Socket interface {
	Write(message interface{})
}

package main

import (
	"time"

	"github.com/jawahars16/kube-monitor/backend"
	"github.com/jawahars16/kube-monitor/kube"
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
)

func main() {

	kube.InitializeClient()
	kube.InitializeMetricsClient()

	// backend.Initialize("/service", backend.ServiceHandler, ":5000")
	backend.Initialize("/node", backend.NodeHandler, ":5000")

	for {
		time.Sleep(time.Second)
	}
}

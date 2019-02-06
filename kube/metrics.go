package kube

import (
	"log"
	"os"
	"path/filepath"

	"github.com/jawahars16/kubex/metrics"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/metrics/pkg/apis/metrics/v1beta1"
)

var metricsClient *metrics.Clientset

func InitializeMetricsClient() {
	kubeconfig := filepath.Join(os.Getenv("HOME"), ".kube", "config")
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)

	if err != nil {
		log.Fatal(err.Error())
	}

	metricsClient, _ = metrics.NewForConfig(config)
}

type errorString struct {
	s string
}

func (e *errorString) Error() string {
	return e.s
}

func MetricsError() error {
	return &errorString{"Metrics Server not available in the cluster."}
}

// GetPodMetrics ...
func GetPodMetrics() ([]v1beta1.PodMetrics, error) {

	if metricsClient == nil {
		return nil, MetricsError()
	}

	m, err := metricsClient.MetricsV1beta1().PodMetricses("").List(metav1.ListOptions{})
	if err != nil {
		return nil, MetricsError()
	}

	return m.Items, nil
}

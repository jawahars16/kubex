package kube

import (
	"log"
	"os"
	"path/filepath"

	"github.com/jawahars16/kube-monitor/metrics"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/metrics/pkg/apis/metrics/v1beta1"
)

var metricsClient *metrics.Clientset

func InitializeMetricsClient() {
	kubeconfig := filepath.Join(os.Getenv("HOME"), ".kube", "config")
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)

	if err != nil {
		panic(err.Error())
	}

	metricsClient, _ = metrics.NewForConfig(config)

	// mc.MetricsV1beta1().NodeMetricses().Get("your node name", metav1.GetOptions{})
	// mc.MetricsV1beta1().NodeMetricses().List(metav1.ListOptions{})
	// mc.MetricsV1beta1().PodMetricses(metav1.NamespaceAll).List(metav1.ListOptions{})
	// m, err := mc.MetricsV1beta1().PodMetricses("default").List(metav1.ListOptions{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// for _, pod := range m.Items {
	// 	podContainers := pod.Containers
	// 	for _, container := range podContainers {
	// 		fmt.Println(container.Usage.Cpu())
	// 		fmt.Println(container.Usage.Memory())
	// 		cpuQuantity := container.Usage.Cpu().String()
	// 		memQuantity, ok := container.Usage.Memory().AsInt64()
	// 		if !ok {
	// 			return
	// 		}
	// 		msg := fmt.Sprintf("Container Name: %s \n CPU usage: %d \n Memory usage: %d", container.Name, cpuQuantity, memQuantity)
	// 		fmt.Println(msg)
	// 	}
	// }
}

// GetPodMetrics ...
func GetPodMetrics() []v1beta1.PodMetrics {
	m, err := metricsClient.MetricsV1beta1().PodMetricses("").List(metav1.ListOptions{})
	if err != nil {
		log.Println("GetPodMetricsChannel")
		log.Fatal(err)
	}

	return m.Items
}

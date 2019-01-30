package kube

import (
	"log"
	"os"
	"path/filepath"

	"github.com/jawahars16/kube-monitor/infra"

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/apimachinery/pkg/watch"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

var client infra.KubeClient

// GetServiceChannel ...
func GetServiceChannel(options metav1.ListOptions, namespace string) <-chan watch.Event {
	watcher, err := client.CoreV1().Services(namespace).Watch(options)
	if err != nil {
		log.Fatal(err)
	}
	return watcher.ResultChan()
}

// GetPodChannelByService ...
func GetPodChannelByService(service *v1.Service) <-chan watch.Event {
	set := labels.Set(service.Spec.Selector)
	listOptions := metav1.ListOptions{LabelSelector: set.AsSelector().String()}
	return GetPodChannel(listOptions, service.Namespace)
}

// GetPodChannel ...
func GetPodChannel(options metav1.ListOptions, namespace string) <-chan watch.Event {
	watcher, err := client.CoreV1().Pods(namespace).Watch(options)
	if err != nil {
		log.Fatal(err)
	}
	return watcher.ResultChan()
}

// GetEventsChannel ...
func GetEventsChannel(namespace string) <-chan watch.Event {
	watcher, err := client.CoreV1().Events(namespace).Watch(metav1.ListOptions{})
	if err != nil {
		log.Fatal(err)
	}
	return watcher.ResultChan()
}

// GetService ...
func GetService(name string, namespace string, options metav1.GetOptions) (*v1.Service, error) {
	return client.CoreV1().Services(namespace).Get(name, options)
}

// ListServices ...
func ListServices(namespace string) []v1.Service {
	serviceList, _ := client.CoreV1().Services(namespace).List(metav1.ListOptions{})
	var services []v1.Service
	for _, service := range serviceList.Items {
		services = append(services, service)
	}
	return services
}

// GetNodeChannel ...
func GetNodeChannel() <-chan watch.Event {
	watch, err := client.CoreV1().Nodes().Watch(metav1.ListOptions{})
	if err != nil {
		log.Fatal(err)
	}
	return watch.ResultChan()
}

// InitializeClient kube client
func InitializeClient() {

	kubeconfig := filepath.Join(os.Getenv("HOME"), ".kube", "config")
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)

	if err != nil {
		panic(err.Error())
	}

	client, _ = kubernetes.NewForConfig(config)

	log.Println("Kubernetes client initialized - ", config.Host)
}

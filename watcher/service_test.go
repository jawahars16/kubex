package watcher

import (
	"testing"
	"time"

	assert "github.com/jawahars16/kubex/infra"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func createMockService() *v1.Service {
	createdTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05+07:00")
	return &v1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "test_service",
			Namespace: "test_namespace",
			Labels:    map[string]string{"labelKey": "labelValue"},
			UID:       "test_uid",
			CreationTimestamp: metav1.Time{
				Time: createdTime,
			},
		},
		Spec: v1.ServiceSpec{
			Selector: map[string]string{"selectorKey": "selectorValue"},
		},
		Status: v1.ServiceStatus{
			LoadBalancer: v1.LoadBalancerStatus{
				Ingress: []v1.LoadBalancerIngress{
					{IP: "test_ip"},
				},
			},
		},
	}
}

func Test_mapService(t *testing.T) {
	service := createMockService()
	got := mapService(service, "test_action", []string{"pod1", "pod2"})
	gotResource := got.Resource.(Service)
	assert.AreStringEqual(t, "test_action", got.Action)
	assert.AreStringEqual(t, "test_service", gotResource.Meta.Name)
	assert.AreStringEqual(t, "test_namespace", gotResource.Meta.Namespace)
	assert.AreStringEqual(t, "test_uid", gotResource.Meta.ID)
	assert.AreStringEqual(t, "labelValue", gotResource.Labels["labelKey"])
	assert.AreStringEqual(t, "selectorValue", gotResource.Selector["selectorKey"])
	assert.AreStringEqual(t, "test_ip", gotResource.IP)
	assert.AreStringEqual(t, "pod1", gotResource.Pods[0])
	assert.AreStringEqual(t, "pod2", gotResource.Pods[1])
	gotTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05+07:00")
	assert.AreStringEqual(t, gotTime.String(), gotResource.Meta.Created.Time.String())
}

func Test_mapService_with_no_ingress(t *testing.T) {
	service := createMockService()
	service.Status.LoadBalancer.Ingress = nil
	got := mapService(service, "test_action", []string{"pod1", "pod2"})
	gotResource := got.Resource.(Service)
	assert.AreStringEqual(t, "", gotResource.IP)
}

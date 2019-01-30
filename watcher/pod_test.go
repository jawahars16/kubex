package watcher

import (
	"testing"
	"time"

	"k8s.io/apimachinery/pkg/api/resource"

	assert "github.com/jawahars16/kube-monitor/infra"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func createMockPod() *v1.Pod {
	createdTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05+07:00")
	return &v1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "test_service",
			Namespace: "test_namespace",
			Labels:    map[string]string{"labelKey": "labelValue"},
			UID:       "test_uid",
			CreationTimestamp: metav1.Time{
				Time: createdTime,
			},
		},
		Status: v1.PodStatus{
			Reason: "Running",
		},
		Spec: v1.PodSpec{
			NodeName: "test_node",
			Containers: []v1.Container{
				{
					Resources: v1.ResourceRequirements{
						Requests: map[v1.ResourceName]resource.Quantity{
							"cpu":    resource.MustParse("1.5"),
							"memory": resource.MustParse("5"),
						},
						Limits: map[v1.ResourceName]resource.Quantity{
							"cpu":    resource.MustParse("2.5"),
							"memory": resource.MustParse("10"),
						},
					},
				},
				{
					Resources: v1.ResourceRequirements{
						Requests: map[v1.ResourceName]resource.Quantity{
							"cpu":    resource.MustParse("0.5"),
							"memory": resource.MustParse("2"),
						},
						Limits: map[v1.ResourceName]resource.Quantity{
							"cpu":    resource.MustParse("1.5"),
							"memory": resource.MustParse("3"),
						},
					},
				},
			},
		},
	}
}

func Test_mapPod(t *testing.T) {
	service := createMockPod()
	got := mapPod(service, "test_action")
	gotResource := got.Resource.(Pod)
	assert.AreStringEqual(t, "test_action", got.Action)
	assert.AreStringEqual(t, "test_service", gotResource.Meta.Name)
	assert.AreStringEqual(t, "test_namespace", gotResource.Meta.Namespace)
	assert.AreStringEqual(t, "test_uid", gotResource.Meta.ID)
	assert.AreStringEqual(t, "labelValue", gotResource.Labels["labelKey"])
	assert.AreStringEqual(t, "Running", gotResource.Status.Reason)
	assert.AreStringEqual(t, "test_node", gotResource.Node)
	assert.AreFloat64Equal(t, 2000, gotResource.Request.CPU)
	assert.AreFloat64Equal(t, 7000, gotResource.Request.Memory)
	assert.AreFloat64Equal(t, 4000, gotResource.Limit.CPU)
	assert.AreFloat64Equal(t, 13000, gotResource.Limit.Memory)
	gotTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05+07:00")
	assert.AreStringEqual(t, gotTime.String(), gotResource.Meta.Created.Time.String())
}

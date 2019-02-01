package watcher

import (
	"testing"

	assert "github.com/jawahars16/kubex/infra"
	v1 "k8s.io/api/core/v1"
)

func createMockEvent() *v1.Event {
	return &v1.Event{
		InvolvedObject: v1.ObjectReference{
			Name: "test_object",
		},
		Reason: "test_reason",
	}
}

func Test_mapEvent(t *testing.T) {
	event := createMockEvent()
	got := mapEvent(event)
	gotResource := got.Resource.(Event)
	assert.AreStringEqual(t, "test_object", gotResource.InvolvedObjectName)
	assert.AreStringEqual(t, "test_reason", gotResource.Reason)
	assert.AreStringEqual(t, "EVENT", got.Action)
}

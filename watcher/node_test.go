package watcher

import (
	"testing"

	assert "github.com/jawahars16/kubex/infra"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func createMockNode() *v1.Node {
	return &v1.Node{
		ObjectMeta: metav1.ObjectMeta{
			Name: "test_node",
		},
	}
}

func Test_mapNode(t *testing.T) {
	node := createMockNode()
	got := mapNode(node, "test_action")
	gotResource := got.Resource.(Node)
	assert.AreStringEqual(t, "test_action", got.Action)
	assert.AreStringEqual(t, "test_node", gotResource.Name)
}

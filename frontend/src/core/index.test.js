import { filterResourcesBySelector, findMaxCPUUsageResource, findNode, getResourcesFromNode, getAvailableCPU, getCPUMetrics, filterResources } from "./index";
import compose from 'lodash/fp/compose'

const createResourceWithLabels = (name, labels) => (
  { meta: { labels, name } });

const createResourceWithCPUUsage = (name, cpu) => ({
  meta: { name },
  usage: { cpu }
})

const createResourceWithCPURequest = (name, cpu) => ({
  meta: { name },
  request: { cpu }
})

const createEmptyResource = name => ({
  meta: { name }
})

it('Get resources by selector', function () {
  const container = {
    pods: ["pod1"]
  };

  const resources = [
    createResourceWithLabels("pod1"),
    createResourceWithLabels("pod2"),
    createResourceWithLabels("pod3")
  ];

  const pods = filterResources(container, resources);
  expect(pods[0].meta.name).toBe("pod1");
})

it('Get resource with max CPU usage', function () {
  const resources = [
    createResourceWithCPUUsage('resource1', 1),
    createResourceWithCPUUsage('resource2', 3),
    createResourceWithCPUUsage('resource3', 2),
    createEmptyResource('resource3')
  ];
  const resource = findMaxCPUUsageResource(resources);
  expect(resource.meta.name).toBe('resource2');
})


it('Get some resource with no usage', function () {
  const resources = [
    createEmptyResource('resource1'),
    createEmptyResource('resource2'),
    createEmptyResource('resource3'),
    createEmptyResource('resource4')
  ];
  const resource = findMaxCPUUsageResource(resources);
  expect(resource.meta.name).toBe('resource4');
})

it('Get node from nodes and resource', function () {
  const nodes = [
    { name: "node1" },
    { name: "node2" }
  ];
  const node = findNode(nodes, { node: "node1" });
  expect(node.name).toBe("node1");
})

it('Get pods from node', function () {
  const node = { 'name': 'node1' };
  const pods = [
    {
      'name': 'pod1',
      'node': 'node1'
    },
    {
      'name': 'pod2',
      'node': 'node1'
    },
    {
      'name': 'pod3',
      'node': 'node2'
    }
  ];
  const result = getResourcesFromNode(node, pods);
  expect(result.length).toBe(2);
  expect(result[0].name).toBe('pod1');
  expect(result[1].name).toBe('pod2');
})

it('Get available CPU', function () {
  const node = { 'name': 'node1', 'cpu': 100 };
  const resources = [
    createResourceWithCPURequest('resource1', 1),
    createResourceWithCPURequest('resource2', 3),
    createResourceWithCPURequest('resource3', 2)
  ];
  const resource = createResourceWithCPURequest('resource1', 1);
  const available = getAvailableCPU(node, resource, resources);
  expect(available).toBe(95);
})

it('Get CPU metrics', function () {
  const { capacity, request, limit, usage } = getCPUMetrics();
  expect(capacity).toBe(0);
  expect(request).toBe(0);
  expect(limit).toBe(0);
  expect(usage).toBe(0);
})
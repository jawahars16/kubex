import { ensureValue } from "./utils";

export const filterResources = (container, resources) => {
  if(!container || !container.pods) return [];
  if (!resources || resources.length <= 0) return [];
  return resources.filter(pod => container.pods.includes(pod.meta.name))
}

export const findMaxCPUUsageResource = resources => {
  let maxUsageResource;

  if (!resources || resources.length <= 0) return maxUsageResource;

  resources.reduce((x, y) => {
    const xUsage = x.usage || { cpu: 0 };
    const yUsage = y.usage || { cpu: 0 };

    if (xUsage.cpu > yUsage.cpu) {
      maxUsageResource = x;
      return x;
    }

    maxUsageResource = y;
    return y;
  })
  return maxUsageResource;
}

export const findNode = (nodes, resource) => {

  if (!nodes || nodes.length <= 0) return;
  if (!resource) return;

  return nodes.find(n => resource.node === n.name);
}

export const getResourcesFromNode = (node, resources) => {
  if (!resources || resources.length <= 0) return;
  if (!node) return;

  return resources.filter(r => r.node === node.name);
}

export const getAvailableCPU = (node, resource, resources) => {
  let consumed = 0;

  if (!resources || resources.length <= 0) return 0;
  if (!node) return 0;

  resources.forEach(r => {
    if (r.meta.name !== resource.meta.name) {
      consumed += r.request.cpu || 0;
    }
  });

  return node.cpu - consumed;
}

export const getCPUMetrics = (container, allResources, nodes) => {
  const defaultMetrics = {
    capacity: 0,
    request: 0,
    limit: 0,
    usage: 0
  }

  if (!allResources || allResources.length <= 0) return defaultMetrics;
  if (!nodes || nodes.length <= 0) return defaultMetrics;

  const resources = filterResources(container, allResources);
  const resource = findMaxCPUUsageResource(resources);
  const node = findNode(nodes, resource);
  const pods = getResourcesFromNode(node, allResources);
  const available = getAvailableCPU(node, resource, pods);

  return {
    capacity: ensureValue(_ => available, 0),
    request: ensureValue(_ => resource.request.cpu, 0),
    limit: ensureValue(_ => resource.limit.cpu, 0),
    usage: ensureValue(_ => resource.usage.cpu, 0)
  };
}

////////---------------Memory-----------///////////

export const findMaxMemoryUsageResource = resources => {
  let maxUsageResource;

  if (!resources || resources.length <= 0) return maxUsageResource;

  resources.reduce((x, y) => {
    const xUsage = x.usage || { memory: 0 };
    const yUsage = y.usage || { memory: 0 };

    if (xUsage.cpu > yUsage.cpu) {
      maxUsageResource = x;
      return x;
    }

    maxUsageResource = y;
    return y;
  })
  return maxUsageResource;
}

export const getAvailableMemory = (node, resource, resources) => {
  let consumed = 0;

  if (!resources || resources.length <= 0) return 0;
  if (!node) return 0;

  resources.forEach(r => {
    if (r.meta.name !== resource.meta.name) {
      consumed += r.request.memory || 0;
    }
  });
  return node.memory - consumed;
}

export const getUMemoryMetrics = (container, allResources, nodes) => {
  const defaultMetrics = {
    capacity: 0,
    request: 0,
    limit: 0,
    usage: 0
  }

  if (!allResources || allResources.length <= 0) return defaultMetrics;
  if (!nodes || nodes.length <= 0) return defaultMetrics;

  const resources = filterResources(container, allResources);
  const resource = findMaxMemoryUsageResource(resources);
  const node = findNode(nodes, resource);
  const pods = getResourcesFromNode(node, allResources);
  const available = getAvailableMemory(node, resource, pods);

  return {
    capacity: ensureValue(_ => available, 0),
    request: ensureValue(_ => resource.request.memory, 0),
    limit: ensureValue(_ => resource.limit.memory, 0),
    usage: ensureValue(_ => resource.usage.memory, 0)
  };
}
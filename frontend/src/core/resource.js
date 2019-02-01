import { materialColors } from "../common/colors";
import { ensureValue } from "./utils";

export const getRequest = resource => {
  let request = resource.request / resource.capacity;
  return request = isNaN(request) ? 0 : request;
}

export const getLimit = resource => {
  let resourceLimit = resource.limit / resource.capacity;
  const request = getRequest(resource);
  resourceLimit = resourceLimit < request ? request : resourceLimit;
  return isNaN(resourceLimit) ? 0 : resourceLimit;
}

export const getUsage = resource => {
  let resourceUsage = resource.usage / resource.capacity;
  const usage = isNaN(resourceUsage) ? 0 : resourceUsage;
  return usage > 1 ? 1 : usage;
}

export const getResourceSectionsAndUsage = resource => {
  let resourceRequest = getRequest(resource);
  let resourceLimit = getLimit(resource);
  let usage = getUsage(resource);

  resourceLimit = resourceLimit <= 0 && resourceRequest <= 0 ? 1 : resourceLimit;

  let sections = [
    { from: 0, to: resourceRequest, color: materialColors.green },
    { from: resourceRequest, to: resourceLimit, color: materialColors.orange },
    { from: resourceLimit, to: 1.0, color: materialColors.red }
  ];
  return { sections, usage };
}

export const getNodeSectionsAndUsage = resource => {
  let resourceRequest = getRequest(resource);
  let usage = getUsage(resource);

  const colorize = value => {
    if (value <= 0.6) {
      return materialColors.green;
    } else if (value <= 0.8) {
      return materialColors.orange;
    } else {
      return materialColors.red;
    }
  }

  let sections = [
    { from: 0, to: resourceRequest, color: colorize(resourceRequest) },
    { from: resourceRequest, to: 1.0, color: materialColors.lightGray }
  ];
  return { sections, usage };
}

export const getSumResources = (pods, resourceCallback) => {
  let total = 0;

  if (!pods || pods.length <= 0) return total;
  pods.forEach(p => total += ensureValue(_ => resourceCallback(p), 0));

  return total;
}
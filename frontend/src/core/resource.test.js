import * as resource from "./resource";

describe('Service component ', function () {
  it('should return valid resource request', function () {
    const resourceRequest = resource.getRequest({
      request: 3,
      capacity: 10
    });
    expect(resourceRequest).toBe(0.3);
  })

  it('should return valid resource request if both are 0', function () {
    const resourceRequest = resource.getRequest({
      request: 0,
      capacity: 0
    });
    expect(resourceRequest).toBe(0);
  })

  it('should return valid resource limit', function () {
    const limit = resource.getLimit({
      limit: 3,
      request: 1,
      capacity: 10
    });
    expect(limit).toBe(0.3);
  })

  it('should return valid resource limit if request > limit', function () {
    const limit = resource.getLimit({
      limit: 3,
      request: 4,
      capacity: 10
    });
    expect(limit).toBe(0.4);
  })

  it('should return valid resource usage', function () {
    const usage = resource.getUsage({
      usage: 1,
      capacity: 10
    });
    expect(usage).toBe(0.1);
  })

  it('should return valid resource usage if both are 0', function () {
    const usage = resource.getUsage({
      usage: 0,
      capacity: 0
    });
    expect(usage).toBe(0);
  })

  it('should always return usage <= 1', function () {
    const usage = resource.getUsage({
      usage: 100,
      capacity: 10
    });
    expect(usage).toBe(1);
  })

  it('should return sections and usage', function () {
    const { sections, usage } = resource.getResourceSectionsAndUsage({ request: 10, limit: 20, usage: 5, capacity: 100 });
    expect(usage).toBe(0.05);
    expect(sections[0].from).toBe(0);
    expect(sections[0].to).toBe(0.1);
    expect(sections[1].from).toBe(0.1);
    expect(sections[1].to).toBe(0.2);
    expect(sections[2].from).toBe(0.2);
    expect(sections[2].to).toBe(1);
  })

  it('should sum resources', function () {
    const pods = [
      { request: { cpu: 2 } },
      { request: { cpu: 5 } },
      { request: { cpu: 0 } },
      { request: {} },
    ]
    const totalCPU = resource.getSumResources(pods, p => p.request.cpu);
    expect(totalCPU).toBe(7);
  })
})
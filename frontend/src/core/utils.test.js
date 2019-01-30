import { ensureValue } from "./utils";

it('Return fallback if object is undefined', function () {
  const resource = {}
  const usage = ensureValue(resource.usage, { cpu: 0 });
  expect(usage.cpu).toBe(0);
})
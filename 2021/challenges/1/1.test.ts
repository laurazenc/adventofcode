import { depthMeasure, entries, threeDepthMeasure } from "./1";

const measures = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe("test depthMeasure", () => {
  it("should return 7 of times the depth measurement increases with example data", () => {
    expect(depthMeasure(measures)).toBe(7);
  });
  it("should return the number of times the depth measurement increases", () => {
    expect(depthMeasure(entries)).toBe(1711);
  });
});

describe.only("test sliding window threeDepthMeasure", () => {
  it("example data", () => {
    expect(threeDepthMeasure(measures)).toBe(5);
  });
  it("real data", () => {
    expect(threeDepthMeasure(entries)).toBe(1743);
  });
});

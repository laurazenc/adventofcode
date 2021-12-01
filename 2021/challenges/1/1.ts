import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname) + "/entry.txt", "utf8");
export const entries: number[] = data
  .toString()
  .split("\n")
  .map((x) => parseInt(x));

export function depthMeasure(measures: number[]): number {
  let depth = 0;
  let lastDepth = measures[0];
  for (let i = 0; i < measures.length; i++) {
    if (measures[i] > lastDepth) {
      depth++;
    }
    lastDepth = measures[i];
  }
  return depth;
}

const fillSlidingWindows = (measures: number[]): any[] => {
  let windows: any = [];

  for (let i = 0; i < measures.length; i++) {
    let measurement = [];
    let sliding = measures[i];
    measurement.push(measures[i]);

    if (i + 1 < measures.length) {
      sliding += measures[i + 1];
    }
    if (i + 2 < measures.length) {
      sliding += measures[i + 2];
    }

    windows.push(sliding);
  }
  return windows;
};

export function threeDepthMeasure(measures: number[]): number {
  let increases = 0;
  const slidingWindows = fillSlidingWindows(measures);

  return depthMeasure(slidingWindows);
}

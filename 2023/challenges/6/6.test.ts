import { describe, expect, it } from "vitest";
import path from "path";
import { partOne, partTwo } from "./6.ts";

describe("Wait For It", () => {
  it("part one", () => {
    const exampleFilePath = `${path.join(__dirname)}/example.txt`;
    expect(partOne(exampleFilePath)).toBe(288);

    const inputFilePath = `${path.join(__dirname)}/input.txt`;
    expect(partOne(inputFilePath)).toBe(160816);
  });

  it("part two", () => {
    const exampleFilePath = `${path.join(__dirname)}/example.txt`;
    expect(partTwo(exampleFilePath)).toBe(71503);

    const inputFilePath = `${path.join(__dirname)}/input.txt`;
    expect(partTwo(inputFilePath)).toBe(46561107);
  });
});

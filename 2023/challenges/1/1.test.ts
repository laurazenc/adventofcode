import { describe, it, expect } from "vitest";
import { partOne, partTwo } from "./1.ts";
import * as path from "path";

describe("Trebuchet", () => {
  it("first part", () => {
    const exampleFilePath = `${path.join(__dirname)}/example.txt`;
    expect(partOne(exampleFilePath)).toBe(142);

    const firstInputFilePath = `${path.join(__dirname)}/input.txt`;
    expect(partOne(firstInputFilePath)).toBe(53194);
  });
  it("second part", () => {
    const exampleInputFilePath = `${path.join(__dirname)}/example2.txt`;
    expect(partTwo(exampleInputFilePath)).toBe(281);

    const firstInputFilePath = `${path.join(__dirname)}/input.txt`;
    expect(partTwo(firstInputFilePath)).toBe(54249);
  });
});

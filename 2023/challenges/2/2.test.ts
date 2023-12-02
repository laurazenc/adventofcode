import { describe, it, expect } from "vitest";
import { partOne, partTwo } from "./2.ts";
import * as path from "path";

describe("Cube Conundrum", () => {
  it("first part", () => {
    const exampleFilePath = `${path.join(__dirname)}/example.txt`;
    expect(partOne(exampleFilePath)).toBe(8);

    const inputFilePath = `${path.join(__dirname)}/input.txt`;
    expect(partOne(inputFilePath)).toBe(2617);
  });
  it("second part", () => {
    const exampleFilePath = `${path.join(__dirname)}/example.txt`;
    expect(partTwo(exampleFilePath)).toBe(2286);

    const inputFilePath = `${path.join(__dirname)}/input.txt`;
    expect(partTwo(inputFilePath)).toBe(59795);
  });
});

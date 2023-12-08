import { describe, expect, it } from "vitest";
import path from "path";
import { partOne, partTwo } from "./8.ts";

describe("Haunted Wasteland", () => {
  it("first part", () => {
    const exampleFilePath = `${path.join(__dirname)}/example.txt`;
    expect(partOne(exampleFilePath)).toBe(2);

    const input = `${path.join(__dirname)}/input.txt`;
    expect(partOne(input)).toBe(16343);
  });

  it("second part", () => {
    const exampleFilePath = `${path.join(__dirname)}/example2.txt`;
    expect(partTwo(exampleFilePath)).toBe(6);

    const input = `${path.join(__dirname)}/input.txt`;
    expect(partTwo(input)).toBe(15299095336639);
  });
});

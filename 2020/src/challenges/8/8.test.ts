import path from "path";
import { getInstructions, loopInstrictions } from ".";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");

describe("challenge 8", () => {
  it("should return an array of instructions", () => {
    expect(getInstructions(data)).toBeDefined();
  });

  it("should return acc", () => {
    expect(loopInstrictions(getInstructions(data))).toBe(5);
  });
});

import path from "path";
import { readFile } from "../../utils/readFile";
import { calculateOxygen, calculatePower } from "./3";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("First part", () => {
  it("example", () => {
    expect(calculatePower(example)).toEqual(198);
  });
  it("challenge", () => {
    expect(calculatePower(exercise)).toEqual(1997414);
  });
});

describe("Seconda part", () => {
  it("example", () => {
    expect(calculateOxygen(example)).toEqual(230);
  });
  it("challenge", () => {
    expect(calculateOxygen(exercise)).toEqual(1032597);
  });
});

import path from "path";
import { readFile } from "../../utils/readFile";
import { calculateOverlapPoints, calculateOverlapPointsInDiagonal } from "./5";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("5", () => {
  it("example", () => {
    expect(calculateOverlapPoints(example)).toEqual(5);
  });
  it("exercise", () => {
    expect(calculateOverlapPoints(exercise)).toEqual(7297);
  });
});

describe("5 2", () => {
  it("example", () => {
    expect(calculateOverlapPointsInDiagonal(example)).toEqual(12);
  });
  it("exercise", () => {
    expect(calculateOverlapPointsInDiagonal(exercise)).toEqual(21038);
  });
});

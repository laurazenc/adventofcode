import path from "path";
import { readFile } from "../../utils/readFile";
import { calculateBingoWinner, getLastBingoWinner } from "./4";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("4", () => {
  it("example", () => {
    expect(calculateBingoWinner(example)).toEqual(4512);
  });
  it("exercise", () => {
    expect(calculateBingoWinner(exercise)).toEqual(46920);
  });
});

describe("4 2", () => {
  it("example", () => {
    expect(getLastBingoWinner(example)).toEqual(1924);
  });
  it("exercise", () => {
    expect(getLastBingoWinner(exercise)).toEqual(1924);
  });
});

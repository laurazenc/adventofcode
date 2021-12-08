import path from "path";
import { readFile } from "../../utils/readFile";
import { countDigits, countUniquePatterns } from "./8";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("8", () => {
  it("example", () => {
    expect(countDigits(example)).toEqual(26);
  });
  it("exercise", () => {
    expect(countDigits(exercise)).toEqual(365);
  });
});

describe("8 2", () => {
  it("example", () => {
    expect(countUniquePatterns(example)).toEqual(61229);
  });
  it("exercise", () => {
    expect(countUniquePatterns(exercise)).toEqual(975706);
  });
});

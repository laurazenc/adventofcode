import path from "path";
import { readFile } from "../../utils/readFile";
import { calculateDepth, calculateDepthWithAim } from "./2";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("First part", () => {
  describe("Example", () => {
    expect(calculateDepth(example)).toEqual(150);
  });
  describe("Exercise", () => {
    expect(calculateDepth(exercise)).toEqual(1660158);
  });
});
describe("Second part", () => {
  it("Example", () => {
    expect(calculateDepthWithAim(example)).toEqual(900);
  });
  it("Exercise", () => {
    expect(calculateDepthWithAim(exercise)).toEqual(1604592846);
  });
});

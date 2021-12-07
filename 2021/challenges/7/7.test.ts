import path from "path";
import { readFile } from "../../utils/readFile";
import { alignCrabsCost, alignIncrementalCrabsCost } from "./7";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("7", () => {
  it("example", () => {
    expect(alignCrabsCost(example)).toEqual(37);
  });
  it("exercise", () => {
    expect(alignCrabsCost(exercise)).toEqual(336040);
  });
});

describe("7 2", () => {
  it("example", () => {
    expect(alignIncrementalCrabsCost(example)).toEqual(168);
  });
  it("exercise", () => {
    expect(alignIncrementalCrabsCost(exercise)).toEqual(94813675);
  });
});

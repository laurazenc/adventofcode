import path from "path";
import { readFile } from "../../utils/readFile";
import { spanFishes } from "./6";

const example = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const exercise = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("6", () => {
  it("example", () => {
    expect(spanFishes(example, 80)).toEqual(5934);
  });
  it("exercise", () => {
    expect(spanFishes(exercise, 80)).toEqual(356190);
  });
});

describe("6 2", () => {
  it("example", () => {
    expect(spanFishes(example, 256)).toEqual(26984457539);
  });
  it("exercise", () => {
    expect(spanFishes(exercise, 256)).toEqual(1617359101538);
  });
});

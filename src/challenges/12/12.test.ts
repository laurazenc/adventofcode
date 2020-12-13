import path from "path";
import { manhattanDistance } from ".";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const real = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("challenge 12", () => {
  it("has distance", () => {
    expect(manhattanDistance(data)).toBe(25);
    expect(manhattanDistance(real)).toBe(1294);
  });
  it("has units", () => {
    expect(manhattanDistance(data, true)).toBe(286);
    expect(manhattanDistance(real, true)).toBe(20592);
  });
});

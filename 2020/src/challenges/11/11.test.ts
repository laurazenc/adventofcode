import path from "path";
import { to2DArray, iterateSeats, countOccupied } from ".";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const real = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

describe("challenge 11", () => {
  it("should transform to array", () => {
    expect(to2DArray(real)).toBeDefined();
  });
  it("should iterate to full seats", () => {
    expect(countOccupied(iterateSeats(to2DArray(data)))).toEqual(37);
    expect(countOccupied(iterateSeats(to2DArray(real)))).toEqual(2324);
  });
  it("count occupied for tolerants", () => {
    expect(countOccupied(iterateSeats(to2DArray(data), true))).toEqual(26);
    expect(countOccupied(iterateSeats(to2DArray(real), true))).toEqual(2068);
  });
});

import path from "path";
import { getHigherJolt, getSol, orderByJolts } from ".";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");

describe("challenge 10", () => {
  it("should be ordered", () => {
    expect(orderByJolts(data)[0]).toBe(1);
  });
  it("should get the higher", () => {
    console.log(getSol(orderByJolts(data)));
  });
});

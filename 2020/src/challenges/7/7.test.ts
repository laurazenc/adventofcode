import path from "path";
import { countBags, fillBags } from ".";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");

describe("challenge 7", () => {
  it("should return bag definition", () => {
    expect(countBags(fillBags(data))).toBe(4);
  });
});

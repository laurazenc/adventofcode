import path from "path";
import { getInvalid, getPreamble, getTargetSum, isValid } from ".";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");

describe("challenge 9", () => {
  it("should get preamble", () => {
    expect(getPreamble(data, 0, 4)[0]).toBe("35");
  });
  it("should get target", () => {
    expect(getTargetSum(data, 5)).toBe("40");
  });
  it("validates sum", () => {
    expect(
      isValid(getPreamble(data, 0, 4), getTargetSum(data, 5))
    ).toBeTruthy();
    expect(
      isValid(getPreamble(data, 9, 13), getTargetSum(data, 14))
    ).toBeFalsy();
  });
  it("gets invalid", () => {
    const invalid = getInvalid(data, 5);
    expect(invalid).toBe("127");
  });
});

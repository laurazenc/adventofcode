import path from "path";
import {
  countAllIn,
  countUnique,
  countYeses,
  getGroupAnswers,
  group,
  groupAnswers,
} from ".";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n\n");

describe("challenge 6", () => {
  it("should count groups", () => {
    expect(groupAnswers(data).length).toBe(5);
  });

  it("should count yeses", () => {
    const yeses = countYeses(groupAnswers(data));
    expect(yeses).toBe(11);
  });

  it("should count yeses", () => {
    expect(countUnique(["a", "b", "c"])).toBe(3);
    expect(countUnique(["a", "a", "a", "a"])).toBe(1);
    expect(countUnique(["b"])).toBe(1);
  });

  it("should getAllIn ", () => {
    expect(countAllIn(group(data))).toBe(6);
  });
  it("should getAllIn ", () => {
    expect(getGroupAnswers(["a", "a", "a", "a"])).toEqual({ a: 4 });
  });
});

import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

export const orderByJolts = (data) => {
  return data.map(Number).sort((a, b) => a - b);
};

export const getSol = (data) => {
  const jolts = data.reduce(
    (acc, curr, idx, all) => {
      const prev = all[idx - 1];
      const diff = curr - (prev || 0);
      acc[diff] += 1;
      return acc;
    },
    { 1: 0, 3: 1 }
  );
  return jolts["1"] * jolts["3"];
};

const getSol2 = (data) => {
  return data
    .reduce(
      (computed, jolt) => {
        computed[jolt] =
          (computed[jolt - 3] || 0) +
          (computed[jolt - 2] || 0) +
          (computed[jolt - 1] || 0);
        return computed;
      },
      [1]
    )
    .pop();
};

const num10 = () => {
  console.log(getSol(orderByJolts(data)));
  console.log(getSol2(orderByJolts(data)));
};

export default num10;

import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

export const getPreamble = (arr, start = 0, size = 0): string[] => {
  let slice = arr.slice(start, size);
  return slice;
};

export const getTargetSum = (arr: string[], index: number): string => {
  let target = arr[index];
  return target;
};

export const isValid = (preamble, target) => {
  let isValid = false;
  preamble.map((pre) => {
    let lookFor = parseInt(target) - parseInt(pre);
    const t = preamble.indexOf(`${lookFor}`);
    if (t !== -1) {
      isValid = true;
      return isValid;
    }
  });
  return isValid;
};

export const getInvalid = (arr, preambleSize = 5) => {
  let invalid;
  for (let i = 0; i <= arr.length - 1; i++) {
    const pre = getPreamble(arr, i, i + preambleSize);
    const target = getTargetSum(arr, i + (preambleSize - 1) + 1);
    if (!isValid(pre, target)) {
      invalid = target;
      return invalid;
    }
  }
  return invalid;
};

export const part2 = (lines) => {
  const range = 25;
  let f;

  for (let x = range; x < lines.length; x++) {
    const test = lines.slice(x - range, x).sort((a, b) => a - b);
    while (test.length >= 2) {
      if (test[0] + test[test.length - 1] === lines[x]) break;
      if (test[0] + test[test.length - 1] < lines[x]) test.shift();
      if (test[0] + test[test.length - 1] > lines[x]) test.pop();
    }
    if (test.length < 2) {
      f = lines[x];
      break;
    }
  }

  const window = [0, 1];

  while (window[1] < lines.length) {
    const slice = lines.slice(...window);
    const sum = slice.reduce((a, v) => a + v, 0);
    if (sum === f) return console.log(Math.min(...slice) + Math.max(...slice));
    if (sum < f) window[1]++;
    if (sum > f) window[0]++;
    if (window[1] === window[0]) window[1]++;
  }
};

const num9 = () => {
  console.log(getInvalid(data, 25));
  console.log(part2(data.map(Number)));
};

export default num9;

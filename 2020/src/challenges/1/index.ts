import { entries } from "./entry";

const num1 = () => {
  entries.map((entry) => {
    const result = entries.indexOf(2020 - entry);
    if (result > -1) {
      console.log("1", entry * entries[result]);
    }
  });
  console.log("2", findTriplets(entries, entries.length, 2020));
};

const findTriplets = (a: number[], size: number, sum: number) => {
  for (let i = 0; i <= size - 2; i++) {
    for (let j = i + 1; j <= size - 1; j++) {
      for (let k = j + 1; k <= size; k++) {
        if (a[i] + a[j] + a[k] === sum) {
          return a[i] * a[j] * a[k];
        }
      }
    }
  }
};

export default num1;

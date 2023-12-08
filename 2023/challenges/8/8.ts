import { readFile } from "../../utils/readFile.ts";

enum InstuctionsMap {
  "L" = "left",
  "R" = "right",
}

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

export function partOne(file: string): number {
  const content = readFile(file);

  const instructions = content[0].split("");
  const path = {};
  for (let i = 2; i < content.length; i++) {
    const guide = content[i].split(" = ");
    const name = guide[0].trim();
    const directions = guide[1].match(/[a-zA-Z]+/g);
    path[name] = { left: directions[0], right: directions[1] };
  }

  function solve(position = "AAA") {
    let steps = 0;
    while (true) {
      const turn = instructions[steps++ % instructions.length];
      position = path[position][InstuctionsMap[turn]];
      if (position === "ZZZ") {
        break;
      }
    }
    return steps;
  }
  return solve();
}

export function partTwo(file: string): number {
  const content = readFile(file);

  const instructions = content[0].split("");
  const path = {};
  for (let i = 2; i < content.length; i++) {
    const guide = content[i].split(" = ");
    const name = guide[0].trim();
    const directions = guide[1].match(/[a-zA-Z0-9]+/g);
    path[name] = { left: directions[0], right: directions[1] };
  }
  function solve(position = "AAA") {
    let steps = 0;
    while (true) {
      const turn = instructions[steps++ % instructions.length];
      position = path[position][InstuctionsMap[turn]];
      if (position[2] === "Z") {
        break;
      }
    }
    return steps;
  }
  const starts = Object.keys(path)
    .filter((i) => {
      return i[2] === "A";
    })
    .map((a) => a);

  return starts.map((a) => solve(a)).reduce((a, b) => lcm(a, b), 1);
}

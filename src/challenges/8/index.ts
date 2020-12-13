import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

const NOP = "nop";
const JUMP = "jmp";
const ACC = "acc";

export const loopInstrictions = (instructrions) => {
  let acc = 0;
  let visitedInstructions = [];
  let i = 0;
  while (visitedInstructions.indexOf(i) === -1) {
    const { name, value } = instructrions[i];
    visitedInstructions.push(i);
    switch (name) {
      case NOP:
        i += 1;
        break;
      case ACC:
        acc += value;
        i += 1;
        break;
      case JUMP:
        i = i + value;
        break;
      default:
        i += 1;
    }
  }

  return { acc, visitedInstructions };
};

export const getInstructions = (data: string[]) => {
  let instricutions = [];
  data.map((ins: string) => {
    const i = ins.split(" ");
    instricutions.push({ name: i[0], value: parseInt(i[1], 10) });
  });
  return instricutions;
};

export const fixCorrupted = () => {
  const instructions = data
    .map((i) => i.split(" "))
    .map(([i, v]) => [i, parseInt(v, 10)]);

  let visited;
  let acc;
  let ptr;

  const switchJmpAndNop = (index) => {
    if (instructions[index][0] === "jmp") {
      instructions[index][0] = "nop";
    } else {
      instructions[index][0] = "jmp";
    }
  };

  const processor = {
    acc: (value) => {
      acc += value;
      ptr++;
    },
    jmp: (value) => {
      ptr += value;
    },
    nop: () => ptr++,
  };

  const runProgram = () => {
    visited = [];
    acc = 0;
    ptr = 0;
    while (ptr < instructions.length) {
      if (visited[ptr] === true) return false;

      visited[ptr] = true;
      const [instruction, value] = instructions[ptr];
      processor[instruction](value);
    }
    return true;
  };

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i][0] === "acc") continue;
    switchJmpAndNop(i);

    if (runProgram()) {
      return acc;
    }

    switchJmpAndNop(i);
  }
};

const num8 = () => {
  const { acc } = loopInstrictions(getInstructions(data));
  console.log(acc);
  console.log(fixCorrupted());
};

export default num8;

import { readFile } from "../../utils/readFile.ts";

export function partOne(path: string): number {
  const content = readFile(path);

  const times = content[0].match(/\d+/g)!.map(Number);
  const record = content[1].match(/\d+/g)!.map(Number);

  const waysOfGettingToRecord = [];

  function calculatePossibilities(time: number, record: number) {
    const possibilities = [];
    // v = s/t
    for (let i = 0; i <= time; i++) {
      const space = i * (time - i);
      if (space > record) possibilities.push(space);
    }
    return possibilities;
  }

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = record[i];

    const possibilities = calculatePossibilities(time, distance);
    waysOfGettingToRecord.push(possibilities.length);
  }
  if (waysOfGettingToRecord.length === 0) return 0;

  return waysOfGettingToRecord.reduce((a, b) => a * b, 1);
}

export function partTwo(path: string): number {
  const content = readFile(path);
  const possibilities = [];

  const time = parseInt(content[0].trim().split("Time:")[1].replace(/\s/g, ""));
  const record = parseInt(
    content[1].trim().split("Distance:")[1].replace(/\s/g, ""),
  );

  for (let i = 0; i <= time; i++) {
    const space = i * (time - i);
    if (space > record) possibilities.push(space);
  }

  return possibilities.length;
}

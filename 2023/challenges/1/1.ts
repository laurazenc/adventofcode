import { readFile } from "../../utils/readFile.ts";

export function partOne(path: string): number {
  const content = readFile(path);
  const pattern = new RegExp(/\d/g);
  const calibrationNumbers = content.map((numbersInLine) => {
    const matches = numbersInLine.match(pattern);
    if (matches) {
      return matches;
    }
  });
  return calibrationNumbers
    .map((match) =>
      match && match.length > 0 ? `${match[0]}${match.slice(-1)}` : "0",
    )
    .reduce((acc, curr) => acc + parseInt(curr), 0);
}

const numberToDigit: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function partTwo(path: string): number {
  const content = readFile(path);
  const numberRegex = /one|two|three|four|five|six|seven|eight|nine/g;

  return content.reduce((acc, curr) => {
    let firstNum, secondNum;
    let builtNum = "";

    for (let i = 0; i < curr.length; i++) {
      const char = curr[i];
      builtNum += char;
      const isNumber = !Number.isNaN(+char);
      const match = builtNum.match(numberRegex);
      if (match) {
        !firstNum
          ? (firstNum = numberToDigit[match[0]])
          : (secondNum = numberToDigit[match[0]]);
        builtNum = builtNum[builtNum.length - 1];
      } else if (isNumber) {
        !firstNum ? (firstNum = +char) : (secondNum = +char);
        builtNum = builtNum[builtNum.length - 1];
      }
    }

    return acc + parseInt(`${firstNum}${secondNum || firstNum}`);
  }, 0);
}

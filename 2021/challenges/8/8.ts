export const countDigits = (data: string[]): number => {
  const count = [0, 0, 0, 0];
  data.forEach((digits) => {
    const [_, ...output] = digits.split(" | ");

    output[0].split(" ").forEach((num) => {
      const digitLength = num.trim().length;

      switch (digitLength) {
        case 2:
          count[0]++;
          break;
        case 3:
          count[2]++;
          break;
        case 4:
          count[1]++;
          break;
        case 7:
          count[3]++;
          break;
        default:
          break;
      }
    });
  });

  return count.reduce((acc, curr) => acc + curr, 0);
};

const buildCustomRegex = (num: string[]): RegExp => {
  const firstPart: string[] = [];
  const secondPart: string[] = [];
  num.forEach((digit) => {
    firstPart.push(`(?=.*${digit})`);
    secondPart.push(digit);
  });

  return new RegExp(`/^${firstPart.join("")}.*$`);
};

export const countUniquePatterns = (data: string[]): number => {
  let sum = 0;
  data.forEach((digits) => {
    const [input, ...output] = digits.split(" | ");
    const uniqueDigits = {
      one: "",
      four: "",
      seven: "",
      eight: "",
    };
    input.split(" ").forEach((num) => {
      const digitCount = num.trim().length;
      switch (digitCount) {
        case 2:
          uniqueDigits.one = num;
          break;
        case 3:
          uniqueDigits.seven = num;
          break;
        case 4:
          uniqueDigits.four = num;
          break;
        case 7:
          uniqueDigits.eight = num;
          break;
        default:
          break;
      }
    });
    let outputNum = "";
    output[0].split(" ").forEach((num) => {
      const digit = num.trim();
      const digitLength = digit.length;
      switch (digitLength) {
        case 2:
          outputNum = `${outputNum}1`;
          break;
        case 3:
          outputNum = `${outputNum}7`;
          break;
        case 4:
          outputNum = `${outputNum}4`;
          break;
        case 7:
          outputNum = `${outputNum}8`;
          break;
        case 5:
          // 2,3,5
          if (numMatches(digit, uniqueDigits.seven) === 3) {
            outputNum = `${outputNum}3`;
          } else {
            numMatches(digit, uniqueDigits.four) === 2
              ? (outputNum = `${outputNum}2`)
              : (outputNum = `${outputNum}5`);
          }
          break;
        case 6:
          // 0,6,9
          if (numMatches(digit, uniqueDigits.four) === 4) {
            outputNum = `${outputNum}9`;
          } else {
            numMatches(digit, uniqueDigits.one) === 2
              ? (outputNum = `${outputNum}0`)
              : (outputNum = `${outputNum}6`);
          }
          break;
        default:
          break;
      }
    });
    sum += parseInt(outputNum);
  });

  return sum;
};

const numMatches = (num: string, match: string): number => {
  let matches: number = 0;
  for (let letter of num) {
    if (match.includes(letter)) {
      matches++;
    }
  }
  return matches;
};

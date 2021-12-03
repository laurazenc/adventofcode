function bin_to_dec(bstr: string) {
  return parseInt((bstr + "").replace(/[^01]/gi, ""), 2);
}

function countBinaries(data: string[]) {
  const binaryLength = data[0].length;
  let zeros = new Array(binaryLength).fill(0);
  let ones = new Array(binaryLength).fill(0);
  data.forEach((binary) => {
    const binaryArray = binary.split("");
    for (let i = 0; i < binaryLength; i++) {
      if (binaryArray[i] === "0") {
        zeros[i]++;
      } else {
        ones[i]++;
      }
    }
  });

  return { zeros, ones };
}

export const calculatePower = (data: string[]) => {
  const binaryLength = data[0].length;
  let gamma = new Array(binaryLength).fill(0);
  let epsilon = new Array(binaryLength).fill(0);

  const { zeros, ones } = countBinaries(data);

  for (let i = 0; i < binaryLength; i++) {
    if (zeros[i] > ones[i]) {
      gamma[i] = 0;
      epsilon[i] = 1;
    } else {
      gamma[i] = 1;
      epsilon[i] = 0;
    }
  }
  return bin_to_dec(gamma.join()) * bin_to_dec(epsilon.join());
};

const iterateArray = (
  data: string[],
  position: number,
  value: string
): string[] => {
  let tmp: string[] = [];
  data.forEach((binary) => {
    const binaryArray = binary.split("");
    if (binaryArray[position] === value) {
      tmp.push(binary);
    }
  });
  return tmp;
};

const getValue = (
  data: string[],
  lookFor: (a: string[], b: string[], current: number) => string
): string[] => {
  const binaryLength = data[0].length;
  let result: string[] = [...data];
  let currentBinaryPosition = 0;
  while (result.length > 1 || currentBinaryPosition > binaryLength) {
    const { zeros, ones } = countBinaries(result);
    let tmp = [...result];
    tmp = iterateArray(
      result,
      currentBinaryPosition,
      lookFor(zeros, ones, currentBinaryPosition)
    );
    result = tmp;
    currentBinaryPosition++;
  }
  return result;
};

const lookForOxygen = (a: string[], b: string[], current: number) => {
  return a[current] > b[current] ? "0" : a[current] < b[current] ? "1" : "1";
};
const lookForCo2 = (a: string[], b: string[], current: number) => {
  return a[current] > b[current] ? "1" : a[current] < b[current] ? "0" : "0";
};
export const calculateOxygen = (data: string[]): number => {
  let oxygen = [...data];
  let co2 = [...data];
  oxygen = getValue(data, lookForOxygen);
  co2 = getValue(data, lookForCo2);

  return bin_to_dec(oxygen[0]) * bin_to_dec(co2[0]);
};

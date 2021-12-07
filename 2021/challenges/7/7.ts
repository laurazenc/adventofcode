const median = (arr: number[]): number => {
  let middle = Math.floor(arr.length / 2);
  arr = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0
    ? arr[middle]
    : (arr[middle - 1] + arr[middle]) / 2;
};

const accSum = (arr: number[]): number => {
  const sum = arr.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue,
    0
  );
  return sum;
};

export const alignCrabsCost = (data: string[]) => {
  const positions = data[0].split(",").map(Number);

  const med = median(positions);

  return positions.reduce((acc, curr) => acc + Math.abs(curr - med), 0);
};

const fuelCost = (n: number) => {
  return (n * (n + 1)) / 2;
};

export const alignIncrementalCrabsCost = (data: string[]) => {
  const positions = data[0].split(",").map(Number);
  const sum = accSum(positions);

  const floorCost = positions.reduce(
    (acc, curr) =>
      acc + fuelCost(Math.abs(curr - Math.floor(sum / positions.length))),
    0
  );
  const ceilCost = positions.reduce(
    (acc, curr) =>
      acc + fuelCost(Math.abs(curr - Math.ceil(sum / positions.length))),
    0
  );

  return Math.min(floorCost, ceilCost);
};

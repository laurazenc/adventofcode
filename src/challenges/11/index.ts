import path from "path";
import { readFile } from "../../utils/readFile";

const EMPTY = "L";
const OCCUPIED = "#";
const FLOOR = ".";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

export const to2DArray = (arr) => {
  let matrix = Array(arr.length)
    .fill("L")
    .map((x) => Array(arr[0].length).fill("L"));
  arr.map((d, i) => {
    d.split("").map((s, j) => {
      matrix[i][j] = s;
    });
  });
  return matrix;
};

export const numOfAdjacents = (x, y, arr) => {
  const list = [];
  for (let dx = x > 0 ? -1 : 0; dx <= (x < arr.length - 1 ? 1 : 0); ++dx) {
    for (let dy = y > 0 ? -1 : 0; dy <= (y < arr[0].length - 1 ? 1 : 0); ++dy) {
      if (dx !== 0 || dy !== 0) {
        list.push(arr[x + dx][y + dy]);
      }
    }
  }

  return list.reduce((accumulator, currentValue) => {
    if (currentValue === OCCUPIED) accumulator++;
    return accumulator;
  }, 0);
};

export const numOfAltAdjacents = (x, y, arr) => {
  const takenSeats = [];
  let leftDiagonal = y;
  let rightDiagonal = y;
  let hasLeftDiag = false;
  let hasStraight = false;
  let hasRightDiag = false;
  for (let topRows = x - 1; topRows >= 0; topRows -= 1) {
    const topRow = arr[topRows];
    leftDiagonal -= 1;
    rightDiagonal += 1;
    if (!hasLeftDiag && topRow[leftDiagonal] !== FLOOR) {
      takenSeats.push(topRow[leftDiagonal]);
      hasLeftDiag = true;
    }
    if (!hasStraight && topRow[y] !== FLOOR) {
      takenSeats.push(topRow[y]);
      hasStraight = true;
    }
    if (!hasRightDiag && topRow[rightDiagonal] !== FLOOR) {
      takenSeats.push(topRow[rightDiagonal]);
      hasRightDiag = true;
    }
    if (hasLeftDiag && hasStraight && hasRightDiag) break;
  }

  leftDiagonal = y;
  rightDiagonal = y;
  hasLeftDiag = false;
  hasStraight = false;
  hasRightDiag = false;
  for (let bottomRows = x + 1; bottomRows < arr.length; bottomRows += 1) {
    const bottomRow = arr[bottomRows];
    leftDiagonal -= 1;
    rightDiagonal += 1;
    if (!hasLeftDiag && bottomRow[leftDiagonal] !== FLOOR) {
      takenSeats.push(bottomRow[leftDiagonal]);
      hasLeftDiag = true;
    }
    if (!hasStraight && bottomRow[y] !== FLOOR) {
      takenSeats.push(bottomRow[y]);
      hasStraight = true;
    }
    if (!hasRightDiag && bottomRow[rightDiagonal] !== FLOOR) {
      takenSeats.push(bottomRow[rightDiagonal]);
      hasRightDiag = true;
    }
    if (hasLeftDiag && hasStraight && hasRightDiag) break;
  }

  let hasRight = false;
  let hasLeft = false;
  let rightCounter = y;
  let leftCounter = y;
  while (!hasRight || !hasLeft) {
    const myRow = arr[x];
    rightCounter += 1;
    leftCounter -= 1;
    if (leftCounter < 0) hasLeft = true;
    if (rightCounter >= myRow.length) hasRight = true;
    if (!hasLeft && myRow[leftCounter] !== FLOOR) {
      takenSeats.push(myRow[leftCounter]);
      hasLeft = true;
    }
    if (!hasRight && myRow[rightCounter] !== FLOOR) {
      takenSeats.push(myRow[rightCounter]);
      hasRight = true;
    }
    if (hasLeft && hasRight) break;
  }
  return takenSeats.filter((s) => s === OCCUPIED).length;
};

const buildArray = (x = 10, y = 10) => {
  const arr = [];

  for (let i = 0; i < x; i++) {
    arr.push(new Array(y));
  }

  return arr;
};

const modSeats = (arr, matrix, seat, i, j) => {
  switch (seat) {
    case EMPTY:
      if (numOfAdjacents(i, j, arr) === 0) {
        matrix[i][j] = OCCUPIED;
      } else {
        matrix[i][j] = seat;
      }
      break;
    case OCCUPIED:
      if (numOfAdjacents(i, j, arr) >= 4) {
        matrix[i][j] = EMPTY;
      } else {
        matrix[i][j] = seat;
      }
      break;
    case FLOOR:
      matrix[i][j] = FLOOR;
      break;
    default:
      matrix[i][j] = seat;
      break;
  }
  return matrix;
};

const altModSeats = (arr, matrix, seat, i, j) => {
  switch (seat) {
    case EMPTY:
      if (numOfAltAdjacents(i, j, arr) === 0) {
        matrix[i][j] = OCCUPIED;
      } else {
        matrix[i][j] = seat;
      }
      break;
    case OCCUPIED:
      if (numOfAltAdjacents(i, j, arr) >= 5) {
        matrix[i][j] = EMPTY;
      } else {
        matrix[i][j] = seat;
      }
      break;
    case FLOOR:
      matrix[i][j] = FLOOR;
      break;
    default:
      matrix[i][j] = seat;
      break;
  }
  return matrix;
};

export const updateArray = (arr, alt = false) => {
  let matrix = buildArray(arr.length, arr[0].length);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      let seat = arr[i][j];

      matrix = alt
        ? altModSeats(arr, matrix, seat, i, j)
        : modSeats(arr, matrix, seat, i, j);
    }
  }
  return matrix;
};

export const iterateSeats = (arr, alt = false) => {
  let prev = arr;
  while (true) {
    const next = updateArray(prev, alt);
    if (JSON.stringify(prev) === JSON.stringify(next)) {
      return next;
    }
    prev = next;
  }
};

export const countOccupied = (arr) => {
  let occupiedSeats = 0;
  const colLength = arr[0].length;
  const rowLength = arr.length;
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (arr[i][j] === OCCUPIED) occupiedSeats++;
    }
  }
  return occupiedSeats;
};

const num11 = () => {
  const array = to2DArray(data);
  console.log(countOccupied(iterateSeats(array)));
};

export default num11;

import fs from "fs";
import path from "path";

// seatID = row * 8 + column
const TOTAL_ROWS = 128 - 1;
const TOTAL_COLUMNS = 8 - 1;

const data = fs.readFileSync(path.join(__dirname) + "/entry.txt", "utf8");
export const passes = data.split("\n");

//BBFFFBBLLL

export const getRow = (directions: string[]) => {
  let minRange = 0;
  let maxRange = TOTAL_ROWS;
  directions.map((d) => {
    if (d === "B") {
      const tmp = Math.ceil((maxRange - minRange) / 2);
      if (tmp <= maxRange && tmp > minRange) {
        minRange = tmp;
      } else {
        minRange += tmp;
      }
    }
    if (d === "F") {
      const tmp = maxRange - Math.floor((maxRange - minRange) / 2) - 1;
      if (tmp >= minRange && tmp < maxRange) {
        maxRange = tmp;
      } else {
        maxRange += tmp;
      }
    }
  });
  return minRange;
};

export const getColumn = (directions: string[]): number => {
  let minRange = 0;
  let maxRange = TOTAL_COLUMNS;
  directions.map((d) => {
    if (d === "R") {
      const tmp = Math.ceil((maxRange - minRange) / 2);
      if (tmp <= maxRange && tmp > minRange) {
        minRange = tmp;
      } else {
        minRange += tmp;
      }
    }
    if (d === "L") {
      const tmp = maxRange - Math.floor((maxRange - minRange) / 2) - 1;
      if (tmp >= minRange && tmp < maxRange) {
        maxRange = tmp;
      } else {
        maxRange -= tmp;
      }
    }
  });
  return maxRange;
};

export const getSeatId = (pass: string): number => {
  const letters = pass.split("");
  const rowDirections = letters.slice(0, 6);
  const columnDirections = letters.slice(7, 10);
  // getRow
  const row = getRow(rowDirections);
  // getColumn
  const column = getColumn(columnDirections);
  // getSeatID
  return row * 8 + column;
};

export const getHighestSeatId = (passes: string[]): number => {
  let maxId = 0;
  passes.map((pass) => {
    const seatId = getSeatId(pass);
    if (maxId < seatId) maxId = seatId;
  });
  return maxId;
};

export const findSeat = (passes: string[]): number => {
  const toBinString = (i) => i.replace(/[B,R]/g, "1").replace(/[F,L]/g, "0");
  const int = (i) => parseInt(i, 2);
  const data = passes.map(toBinString).map(int);
  const max = getHighestSeatId(passes);
  const full = [...Array(passes.length + 1).keys()].map((i) => max - i);
  const ans = [...full, ...data].reduce((p, c) => p ^ c);
  return ans;
};

const num5 = () => {
  try {
    console.log(getHighestSeatId(passes));
    console.log(findSeat(passes));
  } catch (e) {
    console.log(e);
  }
};

export default num5;

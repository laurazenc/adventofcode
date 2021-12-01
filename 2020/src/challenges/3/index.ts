import fs from "fs";
import path from "path";

const num3 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname) + "/entry.txt", "utf8");
    const inputLines = data.split(/[\r\n]+/g);
    const inputChars = inputLines.map((line) => Array.from(line));
    const grid = inputChars.map((row) => row.map((cell) => cell === "#"));

    const isTree = (x: number, y: number) => {
      const row = grid[x];
      y %= row.length;
      return row[y];
    };

    const countTrees = (slopeDown: number, slopeRight: number) => {
      let numTrees = 0;
      for (let x = 0, y = 0; x < grid.length; x += slopeDown, y += slopeRight) {
        if (isTree(x, y)) {
          numTrees++;
        }
      }
      return numTrees;
    };
    console.log(
      `Part 1: number of trees hit for slope [3,1]: ${countTrees(1, 3)}`
    );
    console.log(
      `Part 2: ${
        countTrees(1, 1) *
        countTrees(1, 3) *
        countTrees(1, 5) *
        countTrees(1, 7) *
        countTrees(2, 1)
      }`
    );
  } catch (e) {
    console.log(e);
  }
};

export default num3;

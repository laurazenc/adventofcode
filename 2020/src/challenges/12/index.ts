import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

const EAST = "E";
const WEST = "W";
const NORTH = "N";
const SOUTH = "S";
const LEFT = "L";
const RIGHT = "R";
const FORDWARD = "F";

const getDir = (x: number, y: number, angle: number) => {
  switch (angle) {
    case 0:
      return [x, y];
    case 90:
      return [-y, x];
    case 180:
      return [-x, -y];
    case 270:
      return [y, -x];
  }
};

export const manhattanDistance = (data, alt = false) => {
  let wayX = 10;
  let wayY = 1;
  let x = 0;
  let y = 0;
  let dir = 0;
  data.map((d) => {
    const newDir = d.substring(0, 1);
    const value = parseInt(d.substring(1, d.length));
    switch (newDir) {
      case EAST:
        if (alt) {
          wayX += value;
          break;
        } else {
          x += value;
          break;
        }
      case WEST:
        if (alt) {
          wayX -= value;
          break;
        } else {
          x -= value;
          break;
        }
      case NORTH:
        if (alt) {
          wayY += value;
          break;
        } else {
          y += value;
          break;
        }
      case SOUTH:
        if (alt) {
          wayY -= value;
          break;
        } else {
          y -= value;
          break;
        }
      case LEFT:
        if (alt) {
          [wayX, wayY] = getDir(wayX, wayY, value);
          break;
        } else {
          dir += value;
          break;
        }
      case RIGHT:
        if (alt) {
          [wayX, wayY] = getDir(wayX, wayY, (360 - value) % 360);
          break;
        } else {
          dir += 360 - value;
          break;
        }
      case FORDWARD:
        if (alt) {
          x += wayX * value;
          y += wayY * value;
        } else {
          switch ((dir %= 360)) {
            case 0:
              x += value;
              break;
            case 90:
              y += value;
              break;
            case 180:
              x -= value;
              break;
            case 270:
              y -= value;
              break;
          }
          break;
        }
    }
  });
  return Math.abs(x) + Math.abs(y);
};

const num12 = () => {
  console.log(manhattanDistance(data));
};

export default num12;

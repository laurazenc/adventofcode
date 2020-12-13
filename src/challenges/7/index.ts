import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

const SHINY_GOLD = "shiny gold";
const CONTAIN = " contain ";
const NOBAGS = "no other bags.";

export const containsBag = (map, outerBag, innerBag) => {
  if (map[outerBag][innerBag]) {
    return true;
  }

  return Object.keys(map[outerBag]).reduce((acc, key) => {
    return acc || containsBag(map, key, innerBag);
  }, false);
};

export const countBags = (map) => {
  return Object.keys(map).reduce((count, key) => {
    return count + containsBag(map, key, SHINY_GOLD);
  }, 0);
};

export const howManyBags = (map, bag) => {
  return Object.keys(map[bag]).reduce((acc, key) => {
    return acc + map[bag][key] * (1 + howManyBags(map, key));
  }, 0);
};

export const fillBags = (bags) => {
  return bags.reduce((map, line) => {
    const [left, right] = line.split(CONTAIN);
    const bag = left.split(" ").slice(0, -1).join(" ");
    if (right === NOBAGS) {
      map[bag] = {};
    } else {
      map[bag] = right.split(", ").reduce((innerMap, rule) => {
        const split = rule.split(" ");
        const innerBag = split.slice(1, -1).join(" ");
        innerMap[innerBag] = +split[0];
        return innerMap;
      }, {});
    }
    return map;
  }, {});
};

const num7 = () => {
  try {
    const bags = fillBags(data);
    console.log(countBags(bags));
    console.log(howManyBags(bags, SHINY_GOLD));
  } catch (e) {
    console.log(e);
  }
};

export default num7;

import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n\n");

export const countUnique = (group): number => {
  let newSet = new Set(group);
  return newSet.size;
};

export const countYeses = (responses: string[]): number => {
  let yeses = 0;
  responses.map((res) => {
    yeses += countUnique(res);
  });

  return yeses;
};

export const getGroupAnswers = (group) => {
  var obj = {};
  group = group.join("");
  for (let i = 0, length = group.length; i < length; i++) {
    var l = group.charAt(i);
    obj[l] = isNaN(obj[l]) ? 1 : obj[l] + 1;
  }
  return obj;
};

export const countAllIn = (responses: string[][]): number => {
  let yeses = 0;
  responses.map((res) => {
    const answers = getGroupAnswers(res);
    let groupSize = res.length;
    Object.entries(answers).map(([key, value]) => {
      if (value === groupSize) {
        yeses++;
      }
    });
  });
  return yeses;
};

export const groupAnswers = (data) => {
  return data.map((group): string => group.replace(/\n/g, "").split(""));
};
export const group = (data) => {
  return data.map((group): string => group.split("\n"));
};

const num6 = () => {
  try {
    console.log(countYeses(groupAnswers(data)));
    console.log(countAllIn(group(data)));
  } catch (e) {
    console.log(e);
  }
};

export default num6;

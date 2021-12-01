import fs from "fs";

export const readFile = (path: string, separator: string = "\n") => {
  const data = fs.readFileSync(path, "utf8");
  return data.split(separator);
};

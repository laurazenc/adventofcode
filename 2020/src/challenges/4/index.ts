import fs from "fs";
import path from "path";

const requiresFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const optionalFiled = ["cid"];

const num4 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname) + "/entry.txt", "utf8");
    const inputLines = data.split("\n\n");

    const part1 = () => {
      let validPassports = 0;

      const isValidPassport = (p: any): boolean => {
        let keyValues = p.split(/\s/);
        return containsAllRequiredFields(keyValues);
      };

      const containsAllRequiredFields = (keyValues: any) => {
        let requiredKeysMap = {
          byr: false,
          iyr: false,
          eyr: false,
          hgt: false,
          hcl: false,
          ecl: false,
          pid: false,
          cid: true, //since optional
        } as any;

        let keyRegex = /(\w+):/;

        keyValues.forEach((str: any) => {
          let key = str.match(keyRegex)[1];
          requiredKeysMap[key] = true;
        });

        let allRequiredKeysPresent = true;
        for (let key in requiredKeysMap) {
          if (requiredKeysMap[key] !== true) {
            allRequiredKeysPresent = false;
            break;
          }
        }

        return allRequiredKeysPresent;
      };

      inputLines.forEach((p) => {
        isValidPassport(p) ? validPassports++ : null;
      });
      console.log("Valid passports", validPassports);
    };
    const part2 = () => {
      let validPassports = 0;

      var generateKeysMap = function () {
        return {
          byr: function (i) {
            let reg = /(\d{4})/;
            if (i.match(reg)) {
              i = Number(i.match(reg)[1]);
              return i >= 1920 && i <= 2002;
            } else {
              return false;
            }
          },
          iyr: function (i) {
            let reg = /(\d{4})/;
            if (i.match(reg)) {
              i = Number(i.match(reg)[1]);
              return i >= 2010 && i <= 2020;
            } else {
              return false;
            }
          },
          eyr: function (i) {
            let reg = /(\d{4})/;
            if (i.match(reg)) {
              i = Number(i.match(reg)[1]);
              return i >= 2020 && i <= 2030;
            } else {
              return false;
            }
          },
          hgt: function (i) {
            let reg = /(\d+)(cm|in)/;
            let m = i.match(reg);
            let h = null;
            if (m) {
              if (m[1] && m[2] === "cm") {
                h = Number(m[1]);
                return h >= 150 && h <= 193;
              } else if (m[1] && m[2] === "in") {
                h = Number(m[1]);
                return h >= 59 && h <= 76;
              } else {
                return false;
              }
            } else {
              return false;
            }
          },
          hcl: function (i) {
            let reg = /#[\dabcdef]{6}/;
            return i.match(reg) ? true : false;
          },
          ecl: function (i) {
            return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
              i
            );
          },
          pid: function (i) {
            let reg = /(\d{9})/;
            let m = i.match(reg);
            return m && m[1] === i;
          },
          cid: true, //since optional
        };
      };

      var containsAllRequiredFields = function (keyValues: any) {
        let requiredKeysMap = generateKeysMap();

        let keyRegex = /(\w+):([#\w]+)/;

        keyValues.forEach((str) => {
          let m = str.match(keyRegex);
          // console.log(`m for ${str}: ${m}`)
          let key = m[1];
          let value = m[2];
          if (requiredKeysMap[key] !== true) {
            requiredKeysMap[key] = requiredKeysMap[key](value);
          }
        });

        // console.log(requiredKeysMap);

        let allRequiredKeysPresent = true;
        for (let key in requiredKeysMap) {
          if (requiredKeysMap[key] !== true) {
            allRequiredKeysPresent = false;
            break;
          }
        }

        return allRequiredKeysPresent;
      };
      var isValidPassport = function (p: any) {
        let keyValues = p.split(/\s/);
        return containsAllRequiredFields(keyValues);
      };
      inputLines.forEach((p) => {
        isValidPassport(p) ? validPassports++ : null;
      });
      console.log("Valid passports", validPassports);
    };
    part1();
    part2();
  } catch (e) {
    console.log(e);
  }
};

export default num4;

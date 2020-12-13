import fs from "fs";
import path from "path";

const num2 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname) + "/entry.txt", "utf8");
    const entries = data.toString().split("\n");
    let line = entries.map((entry) => {
      let [cond, password] = entry.split(": ");
      let [numbs, character] = cond.split(" ");
      let [min, max] = numbs.split("-").map(Number);
      return { password, character, min, max };
    });

    console.log(
      line.filter(({ password, character, min, max }) => {
        let change = password.split(character).length - 1;
        return change >= min && change <= max;
      }).length
    );

    console.log(
      line.filter(
        ({ password, character, min, max }) =>
          (password[min - 1] === character) !==
          (password[max - 1] === character)
      ).length
    );
  } catch (e) {
    console.log("Error:", e.stack);
  }
};

export default num2;

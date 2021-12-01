import path from "path";

import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/example.txt`, "\n");
const real = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

const getData = (entry) => {
  let [timestamp, notes] = entry;
  return { timestamp: parseInt(timestamp), lines: notes.split(",") };
};

const calculateNum = (data) => {
  let { timestamp, lines } = getData(data);
  lines = lines.filter((l) => l !== "x").map(Number);

  let lineDep = [];
  lines.map((l) => {
    const times = Math.trunc(timestamp / l);
    lineDep.push({
      bus: l,
      schelude: [l * (times - 1), l * times, l * (times + 1)],
    });
  });
  let closest = 99999999;
  let busId = -1;
  lineDep.map(({ bus, schelude }) => {
    schelude.map((t) => {
      if (t >= timestamp && t < closest) {
        busId = bus;
        closest = t;
      }
    });
  });
  return busId * (closest - timestamp);
};

const getTimeStamp = (data) => {
  const [first, ...buses] = data
    .map((n, i) => [parseInt(n, 10), i])
    .filter(([n]) => !Number.isNaN(n));
  // 7a = t
  // 13b = t + 1  -> (t+1) * mod(b) === 0
  let mult = parseInt(first[0]);
  let t = 0;
  buses.forEach(([b, i]) => {
    if (b !== "x") {
      b = parseInt(b);
      while (true) {
        if ((t + i) % b === 0) {
          mult = mult * b;
          break;
        }
        t += mult;
      }
    }
  });
  return t;
};

describe("challenge 13", () => {
  it("should give the Id times the minutes to wait", () => {
    expect(calculateNum(data)).toBe(295);
    expect(calculateNum(real)).toBe(102);
  });
  it("should find match timestamp", () => {
    expect(getTimeStamp(["17", "x", "13", "19"])).toBe(3417);
    expect(getTimeStamp(["67", "7", "59", "61"])).toBe(754018);
    expect(getTimeStamp(["67", "x", "7", "59", "61"])).toBe(779210);
    expect(getTimeStamp(["67", "7", "x", "59", "61"])).toBe(1261476);
    expect(getTimeStamp(["1789", "37", "47", "1889"])).toBe(1202161486);

    expect(getTimeStamp(getData(data).lines)).toBe(1068781);
    expect(getTimeStamp(getData(real).lines)).toBe(327300950120029);
  });
});

const extractMaxCoordinates = (data: string[]) => {
  let maxX = 0;
  let maxY = 0;
  data.forEach((coordinates) => {
    const [pair1, pair2] = coordinates.split(" -> ");
    const [x1, y1] = pair1.split(",").map(Number);
    const [x2, y2] = pair2.split(",").map(Number);
    if (Math.max(x1, x2) > maxX) {
      maxX = Math.max(x1, x2);
    }
    if (Math.max(y1, y2) > maxY) {
      maxY = Math.max(y1, y2);
    }
  });

  return { maxX, maxY };
};

export const calculateOverlapPoints = (data: string[]): number => {
  const { maxX, maxY } = extractMaxCoordinates(data);
  let diagram: number[][] = Array.from(Array(maxY + 1), () =>
    new Array(maxX + 1).fill(0)
  );
  data.forEach((coordinates) => {
    const [pair1, pair2] = coordinates.split(" -> ");
    const [x1, y1] = pair1.split(",").map(Number);
    const [x2, y2] = pair2.split(",").map(Number);

    const tmp = [...fillDiagramInLine(diagram, x1, y1, x2, y2)];
    diagram = tmp;
  });

  let overlapPoints = 0;
  for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram.length; j++) {
      if (diagram[i][j] > 1) {
        overlapPoints++;
      }
    }
  }
  return overlapPoints;
};

const fillDiagramInLine = (
  diagram: number[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number[][] => {
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      diagram[y][x1] = diagram[y][x1] + 1;
    }
  }
  if (y1 === y2) {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
      diagram[y1][j] = diagram[y1][j] + 1;
    }
  }
  return diagram;
};

export const calculateOverlapPointsInDiagonal = (data: string[]): number => {
  const { maxX, maxY } = extractMaxCoordinates(data);
  let diagram: number[][] = Array.from(Array(maxY + 1), () =>
    new Array(maxX + 1).fill(0)
  );

  data.forEach((coordinates) => {
    const [pair1, pair2] = coordinates.split(" -> ");
    const [x1, y1] = pair1.split(",").map(Number);
    const [x2, y2] = pair2.split(",").map(Number);

    const tmp = [...fillDiagramInDiagonal(diagram, x1, y1, x2, y2)];
    diagram = tmp;
  });

  let overlapPoints = 0;
  for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram.length; j++) {
      if (diagram[i][j] > 1) {
        overlapPoints++;
      }
    }
  }
  return overlapPoints;
};

const fillDiagramInDiagonal = (
  diagram: number[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number[][] => {
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      diagram[y][x1] = diagram[y][x1] + 1;
    }
  } else if (y1 === y2) {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
      diagram[y1][j] = diagram[y1][j] + 1;
    }
  } else {
    if (
      Math.abs(x1 - x2) === Math.abs(y1 - y2) ||
      Math.abs(x1 - y1) === Math.abs(x2 - y2)
    ) {
      const coord1 = [x1, y1];
      const coord2 = [x2, y2];
      let delta = coord1.map((v, i) => coord2[i] - v);
      let distance = Math.max(...delta.map((v) => Math.abs(v)));

      let direction = delta.map((v) => v / distance);
      const b = [...Array(distance + 1)].map((_, i) =>
        coord1.map((v, j) => v + direction[j] * i)
      );

      b.map((c) => {
        diagram[c[1]][c[0]] = diagram[c[1]][c[0]] + 1;
      });
    }
  }

  return diagram;
};

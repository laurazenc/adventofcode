export const calculateDepth = (data: string[]) => {
  let position = { horizontal: 0, depth: 0 };

  data.forEach((line) => {
    const [movement, total] = line.split(" ");

    if (movement === "forward") {
      position.horizontal += parseInt(total);
    } else if (movement === "up") {
      position.depth -= parseInt(total);
    } else if (movement === "down") {
      position.depth += parseInt(total);
    }
  });

  const finalDepth = position.horizontal * position.depth;
  return finalDepth;
};

export const calculateDepthWithAim = (data: string[]) => {
  let position = { horizontal: 0, depth: 0, aim: 0 };
  data.forEach((line) => {
    const [movement, total] = line.split(" ");
    if (movement === "forward") {
      position.horizontal += parseInt(total);
      position.depth += position.aim * parseInt(total);
    } else if (movement === "up") {
      position.aim -= parseInt(total);
    } else if (movement === "down") {
      position.aim += parseInt(total);
    }
  });

  const finalDepth = position.horizontal * position.depth;
  return finalDepth;
};

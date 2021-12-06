export const spanFishes = (fishes: string[], days: number) => {
  const fishList = fishes[0].split(",").map(Number);
  let fishCycles = Array.from(Array(9)).fill(0);

  fishList.forEach((step) => {
    fishCycles[step] = fishCycles[step] + 1;
  });

  let daysPast = 1;

  while (daysPast <= days) {
    // First solution, had problems with memory limitation
    // fishList.forEach((_, index) => {
    //   const tmp = fishList[index];
    //   if (tmp === 0) {
    //     fishList.push(8);
    //     fishList[index] = 6;
    //   } else {
    //     fishList[index] = tmp - 1;
    //   }
    // });
    const [babyFishes, ...adultFishes] = fishCycles;
    fishCycles = [...adultFishes, babyFishes];
    fishCycles[6] += babyFishes;
    daysPast++;
  }

  return fishCycles.reduce((acc, curr) => acc + curr);
};

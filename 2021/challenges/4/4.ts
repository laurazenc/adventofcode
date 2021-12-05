type BingoNumber = { n: number; isMarked: boolean };

const getBoards = (data: string[]): any[][] => {
  let boards: any[][] = [];
  for (let i = 0; i < data.length; i += 6) {
    const newBoard: BingoNumber[][] = [];
    data.slice(i + 1, i + 6).forEach((line) => {
      const lineNumbers: BingoNumber[] = [];
      line.split(" ").map((number) => {
        if (number !== "")
          return lineNumbers.push({
            n: parseInt(number),
            isMarked: false,
          });
      });
      newBoard.push(lineNumbers);
    });
    boards.push(newBoard);
  }

  return boards;
};

function calculateBingo(board: BingoNumber[][], drawNumber: number) {
  let sum = 0;
  board.forEach((line) => {
    line.map((number: BingoNumber) => {
      if (!number.isMarked) sum += number.n;
    });
  });

  return sum * drawNumber;
}

export const calculateBingoWinner = (data: string[]): number => {
  let bingo = 0;
  // get draw numbers
  const drawNumbers = data[0].split(",").map(Number);
  // get boards
  const boardList = data.slice(1);
  let boards: any[][] = getBoards(boardList);

  // draw number
  let isBingo = false;
  drawNumbers.forEach((drawNumber) => {
    // mark number on each board
    if (!isBingo) {
      boards.forEach((board) => {
        board.forEach((line) => {
          line.map((number: BingoNumber) => {
            if (number.n === drawNumber) number.isMarked = true;
          });
        });
      });

      // check if bingo (line or column)
      boards.every((board) => {
        let markedColumns = 0;
        let markedLines = 0;
        // check columns
        for (let j = 0; j < 5; j++) {
          board.forEach((line) => {
            if (line[j].isMarked) markedColumns++;
            if (markedColumns === 5) {
              if (!isBingo) bingo = calculateBingo(board, drawNumber);
              isBingo = true;
            }
          });
          markedColumns = 0;
        }
        board.forEach((line) => {
          // check lines
          line.every((number: BingoNumber) => {
            if (number.isMarked) markedLines++;
            if (markedLines === 5) {
              if (!isBingo) bingo = calculateBingo(board, drawNumber);
              isBingo = true;
              return false;
            }

            return true;
          });
          markedLines = 0;
        });
        return true;
      });
    }
  });
  // if bingo, return (sum of marked numbers * winner number)

  return bingo;
};

const markNumbers = (boards: any[][], drawNumber: number) => {
  boards.forEach((board) => {
    board.forEach((line) => {
      line.map((number: BingoNumber) => {
        if (number.n === drawNumber) number.isMarked = true;
      });
    });
  });

  return boards;
};

export const getLastBingoWinner = (data: string[]): number => {
  let bingo = 0;
  // get draw numbers
  const drawNumbers = data[0].split(",").map(Number);
  // get boards
  const boardList = data.slice(1);
  let boards: any[][] = getBoards(boardList);

  drawNumbers.forEach((drawNumber) => {
    // mark number on each board
    if (boards.length > 1) {
      boards = markNumbers(boards, drawNumber);

      // check if bingo (line or column)
      boards.every((board, currentBoard) => {
        let markedColumns = 0;
        let markedLines = 0;
        // check columns
        for (let j = 0; j < 5; j++) {
          board.forEach((line) => {
            if (line[j].isMarked) markedColumns++;
            if (markedColumns === 5) {
              boards.splice(currentBoard, 1);

              if (boards.length === 1) {
                console.log("last", boards[0], drawNumber);
              }
            }
          });
          markedColumns = 0;
        }
        board.forEach((line) => {
          // check lines
          line.every((number: BingoNumber) => {
            if (number.isMarked) markedLines++;
            if (markedLines === 5) {
              boards.splice(currentBoard, 1);
              if (boards.length === 1) {
                console.log("last", boards[0], drawNumber);
              }
              return true;
            }

            return true;
          });
          markedLines = 0;
        });
        return true;
      });
    } else {
      bingo = calculateBingo(boards[0], drawNumber);
    }
  });

  return bingo;
};

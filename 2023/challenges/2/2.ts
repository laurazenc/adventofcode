import { readFile } from "../../utils/readFile.ts";

// 12 red cubes, 13 green cubes, and 14 blue cubes

const max: {
  red: number;
  green: number;
  blue: number;
} = {
  red: 12,
  green: 13,
  blue: 14,
};

const GAME_SUBSTRING = "Game ";

export function partOne(path: string): number {
  const content = readFile(path);
  const validGames = new Set();
  const invalidGames = new Set();
  content.map((game) => {
    const gameId = parseInt(
      game.substring(
        game.indexOf(GAME_SUBSTRING) + GAME_SUBSTRING.length,
        game.indexOf(":"),
      ),
    );

    game
      .substring(game.indexOf(":") + 1, game.length)
      .split(";")
      .map((line) => line.trim())
      .map((line) => {
        const cubes = { red: 0, green: 0, blue: 0 };
        line.split(", ").map((cube) => {
          Object.keys(cubes).map((color: string) => {
            const num = cube.substring(0, cube.indexOf(color)).trim();
            if (num) {
              cubes[color] = parseInt(num);
            }
          });
        });

        const isValid = Object.keys(cubes).every((color) => {
          return cubes[color] <= max[color];
        });

        if (isValid) {
          validGames.add(gameId);
        } else {
          invalidGames.add(gameId);
        }
      });

    validGames.forEach(
      (gameId) => invalidGames.has(gameId) && validGames.delete(gameId),
    );
  });

  return [...validGames].reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

export function partTwo(path: string): number {
  const content = readFile(path);
  const power = [];
  content.map((game) => {
    const cubes = { red: 0, green: 0, blue: 0 };
    game
      .substring(game.indexOf(":") + 1, game.length)
      .split(";")
      .map((line) => line.trim())
      .map((chance) => {
        chance.split(", ").map((cube) => {
          Object.keys(cubes).map((color: string) => {
            const num = cube.substring(0, cube.indexOf(color)).trim();
            if (num && cubes[color] < parseInt(num)) {
              cubes[color] = parseInt(num);
            }
          });
        });
      });
    const gamePower = Object.values(cubes).reduce((acc, curr) => {
      return acc * curr;
    }, 1);
    power.push(gamePower);
  });

  return power.reduce((acc, curr) => acc + curr, 0);
}

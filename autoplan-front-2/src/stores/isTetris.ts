export function isTetris(game: any): boolean {
  let result: boolean = false;
  const array: number[][] = [];
  for (let i = game.tetrisRow; i < game.plays.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < game.plays[i].length; j++) {
      row.push(game.plays[i].charAt(j) === game.enigma.charAt(j) ? 1 : 0);
    }
    array.push(row);
  }
  const coordinates: { x: number; y: number }[] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      let point: { x: number; y: number } = { x: 0, y: 0 };
      if (array[i][j] === 1) {
        point.y = i;
        point.x = j;
        coordinates.push(point);
      }
    }
  }
  if (coordinates.length >= 4) {
    //* busca tetris O
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (array.length > point.x + 1 && array.length > point.y + 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y + 1] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 1][point.y + 1] === 1
          ) {
            result = true;
          }
        }
      });
    //* busca tetris I
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (array.length > point.x + 3 && array.length > point.y) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 2][point.y] === 1 &&
            array[point.x + 3][point.y] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x && array.length > point.y + 3) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y + 1] === 1 &&
            array[point.x][point.y + 2] === 1 &&
            array[point.x][point.y + 3] === 1
          ) {
            result = true;
          }
        }
      });
    //* busca tetris S
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (array.length > point.x + 3 && array.length > point.y) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 1][point.y - 1] === 1 &&
            array[point.x + 2][point.y - 1] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x + 1 && array.length > point.y + 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y + 1] === 1 &&
            array[point.x + 1][point.y + 1] === 1 &&
            array[point.x + 1][point.y + 2] === 1
          ) {
            result = true;
          }
        }
      });
    //* busca tetris Z
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (array.length > point.x + 2 && array.length > point.y + 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 1][point.y + 1] === 1 &&
            array[point.x + 2][point.y + 1] === 1
          ) {
            result = true;
          }
        }
        if (0 <= point.x - 1 && array.length > point.y + 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y + 1] === 1 &&
            array[point.x - 1][point.y + 1] === 1 &&
            array[point.x - 1][point.y + 2] === 1
          ) {
            result = true;
          }
        }
      });
    //* busca tetris L
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (array.length > point.x + 1 && array.length > point.y + 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y + 1] === 1 &&
            array[point.x][point.y + 2] === 1 &&
            array[point.x + 1][point.y + 2] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x + 2 && 0 <= point.y - 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 2][point.y] === 1 &&
            array[point.x + 2][point.y - 1] === 1
          ) {
            result = true;
          }
        }
        if (0 <= point.x - 1 && 0 <= point.y - 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y - 1] === 1 &&
            array[point.x][point.y - 2] === 1 &&
            array[point.x - 1][point.y - 2] === 1
          ) {
            result = true;
          }
        }
        if (0 <= point.x - 2 && array.length > point.y + 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x - 1][point.y] === 1 &&
            array[point.x - 2][point.y] === 1 &&
            array[point.x - 2][point.y + 1] === 1
          ) {
            result = true;
          }
        }
      });
    //* busca tetris J
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (0 <= point.x - 1 && array.length > point.y + 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y + 1] === 1 &&
            array[point.x][point.y + 2] === 1 &&
            array[point.x - 1][point.y + 2] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x + 2 && array.length > point.y + 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 2][point.y] === 1 &&
            array[point.x + 2][point.y + 1] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x + 1 && 0 <= point.y - 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y - 1] === 1 &&
            array[point.x][point.y - 2] === 1 &&
            array[point.x + 1][point.y - 2] === 1
          ) {
            result = true;
          }
        }
        if (0 <= point.x - 2 && 0 <= point.y - 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x - 1][point.y] === 1 &&
            array[point.x - 2][point.y] === 1 &&
            array[point.x - 2][point.y - 1] === 1
          ) {
            result = true;
          }
        }
      });
    //* busca tetris T
    if (!result)
      coordinates.forEach((point: { x: number; y: number }) => {
        if (array.length > point.x + 2 && 0 <= point.y - 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 1][point.y - 1] === 1 &&
            array[point.x + 2][point.y] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x + 2 && 0 <= point.y - 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y - 1] === 1 &&
            array[point.x + 1][point.y - 1] === 1 &&
            array[point.x][point.y - 2] === 1
          ) {
            result = true;
          }
        }
        if (array.length > point.x + 2 && array.length > point.y + 1) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x + 1][point.y] === 1 &&
            array[point.x + 1][point.y + 1] === 1 &&
            array[point.x + 2][point.y] === 1
          ) {
            result = true;
          }
        }
        if (0 <= point.x - 1 && array.length > point.y - 2) {
          if (
            array[point.x][point.y] === 1 &&
            array[point.x][point.y - 1] === 1 &&
            array[point.x - 1][point.y - 1] === 1 &&
            array[point.x][point.y - 2] === 1
          ) {
            result = true;
          }
        }
      });
  }
  console.log({ tetris: result });
  if (result) game.tetrisRow = game.plays.length;
  return result;
}

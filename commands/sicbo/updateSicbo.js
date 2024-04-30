import { QuaryDatabaes } from "../mysql.js";
import Settle from "./Settle.js";
import BoardBetting from "./boardBetting.js";

let startTime = performance.now();
let remainingTime = performance.now();
let gameTime = 20;

let dices = [1, 1, 1];

const UpdateSicboGames = async () => {
  remainingTime = parseInt(gameTime - (performance.now() - startTime) / 1000);

  const board_quary = `SELECT * FROM sicboBoard`;
  const sicboBoards = await QuaryDatabaes(board_quary);

  console.log(sicboBoards);

  // sicboGames.forEach((sicboGame) => {
  //   BoardBetting(sicboGame, remainingTime);
  // });

  // if (remainingTime <= 0) {
  //   startTime = performance.now();
  //   remainingTime = performance.now();
  //   Settle(dices);
  // }
};

export default UpdateSicboGames;

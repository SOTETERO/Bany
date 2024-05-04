import { QuaryDatabaes } from "../mysql.js";
import Settle from "./Settle.js";
import BoardBetting from "./boardBetting.js";

let startTime = performance.now();
let remainingTime = performance.now();

let state = 0;
const gameTime = 20;
const calculateTime = 20;

let dices = [1, 1, 1];

const UpdateSicboGames = async () => {
  remainingTime = parseInt(gameTime - (performance.now() - startTime) / 1000);

  const board_quary = `SELECT * FROM sicboBoard`;
  const sicboBoards = await QuaryDatabaes(board_quary);

  if (state == 0) {
    remainingTime = gameTime - (performance.now() - startTime) / 1000;

    if (remainingTime <= 0) {
      state = 1;
      startTime = performance.now();
      //돈 정산
    }
  } else {
    remainingTime = calculateTime - (performance.now() - startTime) / 1000;
    if (remainingTime <= 0) {
      state = 0;
      startTime = performance.now();

      // sicboBoards.forEach((sicboBoard) => {
      //   sicboBoard.state = 1;
      // });
    }
  }

  for (let i = 0; i < sicboBoards.length; i++) {
    const sicboBoard = sicboBoards[i];
    if (sicboBoard.state == 0) {
      //대기하는 판 보여주기
    } else {
      if (state == 0) {
        //배팅 하는 보드판
        await BoardBetting(sicboBoard, remainingTime);
      } else {
        //정산 판 보여주기
      }
    }
  }

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

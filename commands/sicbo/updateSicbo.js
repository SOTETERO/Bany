import { DISCORD_HEADER } from "../../env.js";
import GetUser from "../user/getUser.js";
import { userDatas } from "../user/userDatas.js";
import Settle from "./Settle.js";
import { BetType } from "./betType.js";
import BoardBetting from "./boardBetting.js";
import { sicboGames } from "./sicboGame.js";

import axios from "axios";

let startTime = performance.now();
let remainingTime = performance.now();
let gameTime = 20;

let dices = [1, 1, 1];
let sum = 3;

const UpdateSicboGames = async () => {
  remainingTime = parseInt(gameTime - (performance.now() - startTime) / 1000);

  sicboGames.forEach((sicboGame) => {
    BoardBetting(sicboGame, remainingTime);
  });

  if (remainingTime <= 0) {
    startTime = performance.now();
    remainingTime = performance.now();
    Settle(dices);
  }
};

export default UpdateSicboGames;

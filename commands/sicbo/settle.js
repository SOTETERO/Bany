import { BetType } from "./betType.js";
import { sicboGames } from "./sicboGame.js";

const Settle = (dices) => {
  dices[0] = Math.floor(Math.random() * 6 + 1);
  dices[1] = Math.floor(Math.random() * 6 + 1);
  dices[2] = Math.floor(Math.random() * 6 + 1);

  const sum = dices[0] + dices[1] + dices[2];

  sicboGames.forEach((game) => {
    game.lastBetting = [];

    game.betting.forEach((bet) => {
      let bettingInfo = game.lastBetting.find(
        (user) => user.userId === bet.userId
      );

      if (typeof bettingInfo == "undefined") {
        bettingInfo = {
          userId: bet.userId,
          globalName: bet.globalName,
          betting: 0,
          obtained: 0,
        };
        game.lastBetting.push(bettingInfo);
      }

      bettingInfo.betting += bet.betting;

      switch (bet.type) {
        case BetType.ODD:
          if (sum % 2 == 1) {
            bettingInfo.obtained += bet.betting * 2;
          }
          break;
        case BetType.EVEN:
          if (sum % 2 == 0) {
            bettingInfo.obtained += bet.betting * 2;
          }
          break;

        case BetType.BIG:
          if (sum >= 11 && sum <= 17) {
            bettingInfo.obtained += bet.betting * 2;
          }
          break;

        case BetType.SMALL:
          if (sum >= 4 && sum <= 10) {
            bettingInfo.obtained += bet.betting * 2;
          }
          break;

        case BetType.SUM_4:
          if (sum == 4) bettingInfo.obtained += bet.betting * 60;
          break;
        case BetType.SUM_5:
          if (sum == 5) bettingInfo.obtained += bet.betting * 30;
          break;
        case BetType.SUM_6:
          if (sum == 6) bettingInfo.obtained += bet.betting * 18;
          break;
        case BetType.SUM_7:
          if (sum == 7) bettingInfo.obtained += bet.betting * 12;
          break;
        case BetType.SUM_8:
          if (sum == 8) bettingInfo.obtained += bet.betting * 8;
          break;
        case BetType.SUM_9:
          if (sum == 9) bettingInfo.obtained += bet.betting * 7;
          break;
        case BetType.SUM_10:
          if (sum == 10) bettingInfo.obtained += bet.betting * 6;
          break;
        case BetType.SUM_11:
          if (sum == 11) bettingInfo.obtained += bet.betting * 6;
          break;
        case BetType.SUM_12:
          if (sum == 12) bettingInfo.obtained += bet.betting * 7;
          break;
        case BetType.SUM_13:
          if (sum == 13) bettingInfo.obtained += bet.betting * 8;
          break;
        case BetType.SUM_14:
          if (sum == 14) bettingInfo.obtained += bet.betting * 12;
          break;
        case BetType.SUM_15:
          if (sum == 15) bettingInfo.obtained += bet.betting * 18;
          break;
        case BetType.SUM_16:
          if (sum == 16) bettingInfo.obtained += bet.betting * 30;
          break;
        case BetType.SUM_17:
          if (sum == 17) bettingInfo.obtained += bet.betting * 60;
          break;

        case BetType.SINGLE_1:
          if (dices[0] == 1) bettingInfo.obtained += bet.betting;
          if (dices[1] == 1) bettingInfo.obtained += bet.betting;
          if (dices[2] == 1) bettingInfo.obtained += bet.betting;
          if (dices[0] == 1 || dices[1] == 1 || dices[2] == 1)
            bettingInfo.obtained += bet.betting;
          break;

        case BetType.SINGLE_2:
          if (dices[0] == 2) bettingInfo.obtained += bet.betting;
          if (dices[1] == 2) bettingInfo.obtained += bet.betting;
          if (dices[2] == 2) bettingInfo.obtained += bet.betting;
          if (dices[0] == 2 || dices[1] == 2 || dices[2] == 2)
            bettingInfo.obtained += bet.betting;
          break;

        case BetType.SINGLE_3:
          if (dices[0] == 3) bettingInfo.obtained += bet.betting;
          if (dices[1] == 3) bettingInfo.obtained += bet.betting;
          if (dices[2] == 3) bettingInfo.obtained += bet.betting;
          if (dices[0] == 3 || dices[1] == 3 || dices[2] == 3)
            bettingInfo.obtained += bet.betting;
          break;

        case BetType.SINGLE_4:
          if (dices[0] == 4) bettingInfo.obtained += bet.betting;
          if (dices[1] == 4) bettingInfo.obtained += bet.betting;
          if (dices[2] == 4) bettingInfo.obtained += bet.betting;
          if (dices[0] == 4 || dices[1] == 4 || dices[2] == 4)
            bettingInfo.obtained += bet.betting;
          break;

        case BetType.SINGLE_5:
          if (dices[0] == 5) bettingInfo.obtained += bet.betting;
          if (dices[1] == 5) bettingInfo.obtained += bet.betting;
          if (dices[2] == 5) bettingInfo.obtained += bet.betting;
          if (dices[0] == 5 || dices[1] == 5 || dices[2] == 5)
            bettingInfo.obtained += bet.betting;
          break;

        case BetType.SINGLE_6:
          if (dices[0] == 6) bettingInfo.obtained += bet.betting;
          if (dices[1] == 6) bettingInfo.obtained += bet.betting;
          if (dices[2] == 6) bettingInfo.obtained += bet.betting;
          if (dices[0] == 6 || dices[1] == 6 || dices[2] == 6)
            bettingInfo.obtained += bet.betting;
          break;

        default:
      }
    });

    game.lastBetting.forEach((bet) => {
      const userData = GetUser(bet.userId);
      userData.coin += bet.obtained;
    });

    game.betting = [];
  });
};

export default Settle;

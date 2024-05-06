import { QuaryDatabaes } from "../mysql.js";
import AddUserCoin from "../user/addUserCoin.js";
import { BetType } from "./betType.js";

const Settle = async (dices) => {
  const sum = dices[0] + dices[1] + dices[2];
  let count = 0;

  const select_bet_quary = "select * from sicboBet";
  const bets = await QuaryDatabaes(select_bet_quary);
  console.log(bets);

  for (let i = 0; i < bets.length; i++) {
    const bet = bets[i];

    const discord_id = bet.discord_id;
    const bet_type = bet.bet_type.toString().padStart(2, "0");
    const coin = bet.coin;

    let getCoin = 0;
    switch (bet_type) {
      case BetType.ODD:
        if (sum % 2 != 0) getCoin += coin * 2;
        break;

      case BetType.EVEN:
        if (sum % 2 == 0) getCoin += coin * 2;
        break;

      case BetType.BIG:
        if (11 <= sum <= 17) getCoin += coin * 2;
        break;

      case BetType.SMALL:
        if (4 <= sum <= 10) getCoin += coin * 2;
        break;

      case BetType.SINGLE_1:
        if (dices[0] == 1) count += 1;
        if (dices[1] == 1) count += 1;
        if (dices[2] == 1) count += 1;

        if (count == 1) getCoin += coin * 2;
        else if (count == 2) getCoin += coin * 11;
        else if (count == 3) getCOin += coin * 180;
        break;

      case BetType.SINGLE_2:
        if (dices[0] == 2) count += 1;
        if (dices[1] == 2) count += 1;
        if (dices[2] == 2) count += 1;

        if (count == 1) getCoin += coin * 2;
        else if (count == 2) getCoin += coin * 11;
        else if (count == 3) getCOin += coin * 180;
        break;

      case BetType.SINGLE_3:
        if (dices[0] == 3) count += 1;
        if (dices[1] == 3) count += 1;
        if (dices[2] == 3) count += 1;

        if (count == 1) getCoin += coin * 2;
        else if (count == 2) getCoin += coin * 11;
        else if (count == 3) getCOin += coin * 180;
        break;

      case BetType.SINGLE_4:
        if (dices[0] == 4) count += 1;
        if (dices[1] == 4) count += 1;
        if (dices[2] == 4) count += 1;

        if (count == 1) getCoin += coin * 2;
        else if (count == 2) getCoin += coin * 11;
        else if (count == 3) getCOin += coin * 180;
        break;

      case BetType.SINGLE_5:
        if (dices[0] == 5) count += 1;
        if (dices[1] == 5) count += 1;
        if (dices[2] == 5) count += 1;

        if (count == 1) getCoin += coin * 2;
        else if (count == 2) getCoin += coin * 11;
        else if (count == 3) getCOin += coin * 180;
        break;

      case BetType.SINGLE_6:
        if (dices[0] == 6) count += 1;
        if (dices[1] == 6) count += 1;
        if (dices[2] == 6) count += 1;

        if (count == 1) getCoin += coin * 2;
        else if (count == 2) getCoin += coin * 11;
        else if (count == 3) getCOin += coin * 180;
        break;

      case BetType.SUM_4:
        if (sum == 4) getCoin += coin * 60;
        break;

      case BetType.SUM_5:
        if (sum == 5) getCoin += coin * 20;
        break;

      case BetType.SUM_6:
        if (sum == 6) getCoin += coin * 18;
        break;

      case BetType.SUM_7:
        if (sum == 7) getCoin += coin * 12;
        break;

      case BetType.SUM_8:
        if (sum == 8) getCoin += coin * 8;
        break;

      case BetType.SUM_9:
        if (sum == 9) getCoin += coin * 6;
        break;

      case BetType.SUM_10:
        if (sum == 10) getCoin += coin * 6;
        break;

      case BetType.SUM_11:
        if (sum == 11) getCoin += coin * 6;
        break;

      case BetType.SUM_12:
        if (sum == 12) getCoin += coin * 6;
        break;

      case BetType.SUM_13:
        if (sum == 13) getCoin += coin * 8;
        break;

      case BetType.SUM_14:
        if (sum == 14) getCoin += coin * 12;
        break;

      case BetType.SUM_15:
        if (sum == 15) getCoin += coin * 18;
        break;

      case BetType.SUM_16:
        if (sum == 16) getCoin += coin * 20;
        break;

      case BetType.SUM_17:
        if (sum == 17) getCoin += coin * 60;
        break;

      default:
        break;
    }

    if (getCoin != 0) {
      await AddUserCoin(discord_id, getCoin);
    }
  }
};

export default Settle;

import axios from "axios";
import { BetType } from "./betType.js";
import { DISCORD_HEADER } from "../../env.js";
import { QuaryDatabaes } from "../mysql.js";
import Settle from "./Settle.js";

const BoardSettle = async (sicboGame, dices, remainingTime) => {
  const { id, channel_id, message_id } = sicboGame;

  const sum = dices[0] + dices[1] + dices[2];

  let odd_value = "";
  let even_value = "";
  let big_value = "";
  let small_value = "";
  let single_value = "";
  let sum_value = "";

  const bet_quary = `SELECT * FROM sicboBet WHERE board_id = ${id}`;
  const bets = await QuaryDatabaes(bet_quary);

  bets.forEach((bet) => {
    const type = bet.bet_type.toString().padStart(2, "0");
    const coin = bet.coin;
    const nickname = bet.nickname;

    switch (type) {
      case BetType.ODD:
        if (sum % 2 != 0) odd_value += "+";
        else odd_value += "-";

        odd_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.EVEN:
        if (sum % 2 == 0) even_value += "+";
        else even_value += "- ";

        even_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.BIG:
        if (11 <= sum <= 17) big_value += "+";
        else big_value += "-";

        big_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.SMALL:
        if (4 <= sum <= 10) small_value += "+";
        else small_value += "-";

        small_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.SINGLE_1:
        if (dices[0] == 1 || dices[1] == 1 || dices[2] == 1)
          single_value += "+";
        else single_value += "-";

        single_value += `${nickname} {1}: ${coin}\n`;
        break;
      case BetType.SINGLE_2:
        if (dices[0] == 2 || dices[1] == 2 || dices[2] == 2)
          single_value += "+";
        else single_value += "-";

        single_value += `${nickname} {2}: ${coin}\n`;
        break;
      case BetType.SINGLE_3:
        if (dices[0] == 3 || dices[1] == 3 || dices[2] == 3)
          single_value += "+";
        else single_value += "-";

        single_value += `${nickname} {3}: ${coin}\n`;
        break;
      case BetType.SINGLE_4:
        if (dices[0] == 4 || dices[1] == 4 || dices[2] == 4)
          single_value += "+";
        else single_value += "-";

        single_value += `${nickname} {4}: ${coin}\n`;
        break;
      case BetType.SINGLE_5:
        if (dices[0] == 5 || dices[1] == 5 || dices[2] == 5)
          single_value += "+";
        else single_value += "-";

        single_value += `${nickname} {5}: ${coin}\n`;
        break;
      case BetType.SINGLE_6:
        if (dices[0] == 6 || dices[1] == 6 || dices[2] == 6)
          single_value += "+";
        else single_value += "-";

        single_value += `${nickname} {6}: ${coin}\n`;
        break;

      case BetType.SUM_4:
        if (sum == 4) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {4}: ${coin}\n`;
        break;
      case BetType.SUM_5:
        if (sum == 5) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {5}: ${coin}\n`;
        break;
      case BetType.SUM_6:
        if (sum == 6) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {6}: ${coin}\n`;
        break;
      case BetType.SUM_7:
        if (sum == 7) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {7}: ${coin}\n`;
        break;
      case BetType.SUM_8:
        if (sum == 8) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {8}: ${coin}\n`;
        break;
      case BetType.SUM_9:
        if (sum == 9) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {9}: ${coin}\n`;
        break;
      case BetType.SUM_10:
        if (sum == 10) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {10}: ${coin}\n`;
        break;
      case BetType.SUM_11:
        if (sum == 11) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {11}: ${coin}\n`;
        break;
      case BetType.SUM_12:
        if (sum == 12) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {12}: ${coin}\n`;
        break;
      case BetType.SUM_13:
        if (sum == 13) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {13}: ${coin}\n`;
        break;
      case BetType.SUM_14:
        if (sum == 14) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {14}: ${coin}\n`;
        break;
      case BetType.SUM_15:
        if (sum == 15) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {15}: ${coin}\n`;
        break;
      case BetType.SUM_16:
        if (sum == 16) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {16}: ${coin}\n`;
        break;
      case BetType.SUM_17:
        if (sum == 17) sum_value += "+";
        else sum_value += "-";

        sum_value += `${nickname} {17}: ${coin}\n`;
        break;

      default:
    }
  });

  if (odd_value != "") {
    odd_value = "```diff\n" + odd_value + "```";
  }
  if (even_value != "") {
    even_value = "```diff\n" + even_value + "```";
  }
  if (big_value != "") {
    big_value = "```diff\n" + big_value + "```";
  }
  if (small_value != "") {
    small_value = "```diff\n" + small_value + "```";
  }
  if (single_value != "") {
    single_value = "```diff\n" + single_value + "```";
  }
  if (sum_value != "") {
    sum_value = "```diff\n" + sum_value + "```";
  }

  const data = {
    embeds: [
      {
        title: `------------:game_die: 다이사이 :game_die: ${dices[0]} ${dices[1]} ${dices[2]}------------`,
        description: "```asciidoc\n💵Settle💵\n``` ",
        fields: [
          {
            name: `홀`,
            value: odd_value,
            inline: true,
          },
          {
            name: `짝`,
            value: even_value,
            inline: true,
          },
          {
            name: `SINGLE`,
            value: single_value,
            inline: true,
          },
          {
            name: `SMALL(4~10)`,
            value: small_value,
            inline: true,
          },
          {
            name: `BIG(11~17)`,
            value: big_value,
            inline: true,
          },
          {
            name: `SUM`,
            value: sum_value,
            inline: true,
          },
          {
            name: `판돈`,
            value: `${1000}`,
            inline: true,
          },
          {
            name: `남은시간`,
            value: `${parseInt(remainingTime)}`,
            inline: true,
          },
        ],
      },
    ],
  };

  const url = `https://discord.com/api/v10/channels/${channel_id}/messages/${message_id}`;

  axios
    .patch(url, data, { headers: DISCORD_HEADER })
    .then((response) => {})
    .catch((error) => {
      console.log("Error:", error.message);
    });
};

export default BoardSettle;

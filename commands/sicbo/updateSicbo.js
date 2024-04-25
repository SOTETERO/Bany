import { DISCORD_HEADER } from "../../env.js";
import GetUser from "../user/getUser.js";
import { userDatas } from "../user/userDatas.js";
import Settle from "./Settle.js";
import { BetType } from "./betType.js";
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
    UpdateSicbo(sicboGame);
  });

  if (remainingTime <= 0) {
    startTime = performance.now();
    remainingTime = performance.now();
    Settle(dices);
  }
};

const UpdateSicbo = async (sicboGame) => {
  const { channelId, messageId } = sicboGame;

  const url = `https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`;

  let lastGameValue = "";
  sicboGame.lastBetting.forEach((bet) => {
    const globalName = bet.globalName;
    const betting = bet.betting;
    const obtained = bet.obtained;

    lastGameValue += `${globalName} : ${betting} => ${obtained}\n`;
  });

  let odd_value = "";
  let even_value = "";
  let big_value = "";
  let small_value = "";
  let single_value = "";
  let sum_value = "";

  sicboGame.betting.forEach((bet) => {
    const globalName = bet.globalName;
    const type = bet.type;
    const betting = bet.betting;

    switch (type) {
      case BetType.ODD:
        odd_value += `${globalName} : ${betting}\n`;
        break;

      case BetType.EVEN:
        even_value += `${globalName} : ${betting}\n`;
        break;

      case BetType.BIG:
        big_value += `${globalName} : ${betting}\n`;
        break;

      case BetType.SMALL:
        small_value += `${globalName} : ${betting}\n`;
        break;

      case BetType.SINGLE_1:
        single_value += `${globalName} {1}: ${betting}\n`;
        break;
      case BetType.SINGLE_2:
        single_value += `${globalName} {2}: ${betting}\n`;
        break;
      case BetType.SINGLE_3:
        single_value += `${globalName} {3}: ${betting}\n`;
        break;
      case BetType.SINGLE_4:
        single_value += `${globalName} {4}: ${betting}\n`;
        break;
      case BetType.SINGLE_5:
        single_value += `${globalName} {5}: ${betting}\n`;
        break;
      case BetType.SINGLE_6:
        single_value += `${globalName} {6}: ${betting}\n`;
        break;

      case BetType.SUM_4:
        sum_value += `${globalName} {4}: ${betting}\n`;
        break;
      case BetType.SUM_5:
        sum_value += `${globalName} {5}: ${betting}\n`;
        break;
      case BetType.SUM_6:
        sum_value += `${globalName} {6}: ${betting}\n`;
        break;
      case BetType.SUM_7:
        sum_value += `${globalName} {7}: ${betting}\n`;
        break;
      case BetType.SUM_8:
        sum_value += `${globalName} {8}: ${betting}\n`;
        break;
      case BetType.SUM_9:
        sum_value += `${globalName} {9}: ${betting}\n`;
        break;
      case BetType.SUM_10:
        sum_value += `${globalName} {10}: ${betting}\n`;
        break;
      case BetType.SUM_11:
        sum_value += `${globalName} {11}: ${betting}\n`;
        break;
      case BetType.SUM_12:
        sum_value += `${globalName} {12}: ${betting}\n`;
        break;
      case BetType.SUM_13:
        sum_value += `${globalName} {13}: ${betting}\n`;
        break;
      case BetType.SUM_14:
        sum_value += `${globalName} {14}: ${betting}\n`;
        break;
      case BetType.SUM_15:
        sum_value += `${globalName} {15}: ${betting}\n`;
        break;
      case BetType.SUM_16:
        sum_value += `${globalName} {16}: ${betting}\n`;
        break;
      case BetType.SUM_17:
        sum_value += `${globalName} {17}: ${betting}\n`;
        break;

      default:
    }
  });

  const data = {
    embeds: [
      {
        title: "----------:game_die: BETTING :game_die:----------",
        fields: [
          {
            name: `남은 시간 : `,
            value: `${remainingTime}`,
            inline: true,
          },
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
        ],
      },
    ],

    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "홀",
            style: 1,
            custom_id: "sicboBet_" + BetType.ODD + "_" + messageId,
          },
          {
            type: 2,
            label: "짝",
            style: 1,
            custom_id: "sicboBet_" + BetType.EVEN + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM4",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_4 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM17",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_17 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM9",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_9 + "_" + messageId,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "큰",
            style: 1,
            custom_id: "sicboBet_" + BetType.BIG + "_" + messageId,
          },
          {
            type: 2,
            label: "작은",
            style: 1,
            custom_id: "sicboBet_" + BetType.SMALL + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM5",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_5 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM16",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_16 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM10",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_10 + "_" + messageId,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "SINGLE1",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_1 + "_" + messageId,
          },
          {
            type: 2,
            label: "SINGLE2",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_2 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM6",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_6 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM15",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_15 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM11",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_11 + "_" + messageId,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "SINGLE3",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_3 + "_" + messageId,
          },
          {
            type: 2,
            label: "SINGLE4",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_4 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM7",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_7 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM14",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_14 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM12",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_12 + "_" + messageId,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "SINGLE5",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_5 + "_" + messageId,
          },
          {
            type: 2,
            label: "SINGLE6",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_6 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM8",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_8 + "_" + messageId,
          },
          {
            type: 2,
            label: "SUM13",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_13 + "_" + messageId,
          },
        ],
      },
    ],
  };

  axios
    .patch(url, data, { headers: DISCORD_HEADER })
    .then((response) => {})
    .catch((error) => {
      console.log("Error:", error.message);
    });
};

export default UpdateSicboGames;

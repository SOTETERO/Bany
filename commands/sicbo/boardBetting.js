import axios from "axios";
import { BetType } from "./betType.js";
import { DISCORD_HEADER } from "../../env.js";

const BoardBetting = async (sicboGame, remainingTime) => {
  const { id, channelId, messageId } = sicboGame;

  const url = `https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`;

  let odd_value = "";
  let even_value = "";
  let big_value = "";
  let small_value = "";
  let single_value = "";
  let sum_value = "";

  sicboGame.betting.forEach((bet) => {
    const globalName = bet.userData.globalName;
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
        title: `------------:game_die: 다이사이 :game_die:------------`,
        description: "```asciidoc\n💵Betting💵\n```",
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
            value: `${remainingTime}`,
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
            custom_id: "sicboBet_" + BetType.ODD + "_" + id,
          },
          {
            type: 2,
            label: "짝",
            style: 1,
            custom_id: "sicboBet_" + BetType.EVEN + "_" + id,
          },
          {
            type: 2,
            label: "합4",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_4 + "_" + id,
          },
          {
            type: 2,
            label: "합17",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_17 + "_" + id,
          },
          {
            type: 2,
            label: "합9",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_9 + "_" + id,
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
            custom_id: "sicboBet_" + BetType.BIG + "_" + id,
          },
          {
            type: 2,
            label: "작은",
            style: 1,
            custom_id: "sicboBet_" + BetType.SMALL + "_" + id,
          },
          {
            type: 2,
            label: "합5",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_5 + "_" + id,
          },
          {
            type: 2,
            label: "합16",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_16 + "_" + id,
          },
          {
            type: 2,
            label: "합10",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_10 + "_" + id,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "1",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_1 + "_" + id,
          },
          {
            type: 2,
            label: "2",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_2 + "_" + id,
          },
          {
            type: 2,
            label: "합6",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_6 + "_" + id,
          },
          {
            type: 2,
            label: "합15",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_15 + "_" + id,
          },
          {
            type: 2,
            label: "합11",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_11 + "_" + id,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "3",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_3 + "_" + id,
          },
          {
            type: 2,
            label: "4",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_4 + "_" + id,
          },
          {
            type: 2,
            label: "합7",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_7 + "_" + id,
          },
          {
            type: 2,
            label: "합14",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_14 + "_" + id,
          },
          {
            type: 2,
            label: "합12",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_12 + "_" + id,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "5",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_5 + "_" + id,
          },
          {
            type: 2,
            label: "6",
            style: 1,
            custom_id: "sicboBet_" + BetType.SINGLE_6 + "_" + id,
          },
          {
            type: 2,
            label: "합8",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_8 + "_" + id,
          },
          {
            type: 2,
            label: "합13",
            style: 1,
            custom_id: "sicboBet_" + BetType.SUM_13 + "_" + id,
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

export default BoardBetting;

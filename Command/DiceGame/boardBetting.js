import axios from "axios";
import { BetType } from "./betType.js";
import { DISCORD_HEADER } from "../../env.js";
import { QuaryDatabaes } from "../mysql.js";

const BoardBetting = async (sicboGame, remainingTime) => {
  const { id, channel_id, message_id } = sicboGame;

  const url = `https://discord.com/api/v10/channels/${channel_id}/messages/${message_id}`;

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
        odd_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.EVEN:
        even_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.BIG:
        big_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.SMALL:
        small_value += `${nickname} : ${coin}\n`;
        break;

      case BetType.SINGLE_1:
        single_value += `${nickname} {1}: ${coin}\n`;
        break;
      case BetType.SINGLE_2:
        single_value += `${nickname} {2}: ${coin}\n`;
        break;
      case BetType.SINGLE_3:
        single_value += `${nickname} {3}: ${coin}\n`;
        break;
      case BetType.SINGLE_4:
        single_value += `${nickname} {4}: ${coin}\n`;
        break;
      case BetType.SINGLE_5:
        single_value += `${nickname} {5}: ${coin}\n`;
        break;
      case BetType.SINGLE_6:
        single_value += `${nickname} {6}: ${coin}\n`;
        break;

      case BetType.SUM_4:
        sum_value += `${nickname} {4}: ${coin}\n`;
        break;
      case BetType.SUM_5:
        sum_value += `${nickname} {5}: ${coin}\n`;
        break;
      case BetType.SUM_6:
        sum_value += `${nickname} {6}: ${coin}\n`;
        break;
      case BetType.SUM_7:
        sum_value += `${nickname} {7}: ${coin}\n`;
        break;
      case BetType.SUM_8:
        sum_value += `${nickname} {8}: ${coin}\n`;
        break;
      case BetType.SUM_9:
        sum_value += `${nickname} {9}: ${coin}\n`;
        break;
      case BetType.SUM_10:
        sum_value += `${nickname} {10}: ${coin}\n`;
        break;
      case BetType.SUM_11:
        sum_value += `${nickname} {11}: ${coin}\n`;
        break;
      case BetType.SUM_12:
        sum_value += `${nickname} {12}: ${coin}\n`;
        break;
      case BetType.SUM_13:
        sum_value += `${nickname} {13}: ${coin}\n`;
        break;
      case BetType.SUM_14:
        sum_value += `${nickname} {14}: ${coin}\n`;
        break;
      case BetType.SUM_15:
        sum_value += `${nickname} {15}: ${coin}\n`;
        break;
      case BetType.SUM_16:
        sum_value += `${nickname} {16}: ${coin}\n`;
        break;
      case BetType.SUM_17:
        sum_value += `${nickname} {17}: ${coin}\n`;
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
            value: `${parseInt(remainingTime)}`,
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

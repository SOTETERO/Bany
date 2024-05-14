import axios from "axios";

import { DISCORD_HEADER } from "../../env.js";
import { diceBoard as diceBoards } from "./DiceBoard.js";
import { BetType } from "./betType.js";

const CreateDiceBoard = async (interaction) => {
  await interaction.reply("주사위 게임 생성");
  await interaction.deleteReply();

  //보드판 생성
  const { channelId } = interaction;

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die:\n Loading...",
      },
    ],
  };

  const url1 = `https://discord.com/api/v10/channels/${channelId}/messages`;
  const response1 = await axios.post(url1, data, { headers: DISCORD_HEADER });

  const board_id = diceBoards.length;

  //보드 등록
  const diceBoard = {
    board_id: board_id,
    channel_id: channelId,
    message_id: response1.data.id,
    stake: 1000,
    bets: [],
  };
  diceBoards.push(diceBoard);

  //버튼 생성 메시지
  const buttonData = {
    embeds: [
      {
        title: "버튼 생성",
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
            custom_id: "DiceGameBet_" + BetType.ODD + "_" + board_id,
          },
          {
            type: 2,
            label: "짝",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.EVEN + "_" + board_id,
          },
          {
            type: 2,
            label: "합4",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_4 + "_" + board_id,
          },
          {
            type: 2,
            label: "합17",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_17 + "_" + board_id,
          },
          {
            type: 2,
            label: "합9",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_9 + "_" + board_id,
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
            custom_id: "DiceGameBet_" + BetType.BIG + "_" + board_id,
          },
          {
            type: 2,
            label: "작은",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SMALL + "_" + board_id,
          },
          {
            type: 2,
            label: "합5",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_5 + "_" + board_id,
          },
          {
            type: 2,
            label: "합16",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_16 + "_" + board_id,
          },
          {
            type: 2,
            label: "합10",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_10 + "_" + board_id,
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
            custom_id: "DiceGameBet_" + BetType.SINGLE_1 + "_" + board_id,
          },
          {
            type: 2,
            label: "2",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SINGLE_2 + "_" + board_id,
          },
          {
            type: 2,
            label: "합6",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_6 + "_" + board_id,
          },
          {
            type: 2,
            label: "합15",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_15 + "_" + board_id,
          },
          {
            type: 2,
            label: "합11",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_11 + "_" + board_id,
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
            custom_id: "DiceGameBet_" + BetType.SINGLE_3 + "_" + board_id,
          },
          {
            type: 2,
            label: "4",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SINGLE_4 + "_" + board_id,
          },
          {
            type: 2,
            label: "합7",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_7 + "_" + board_id,
          },
          {
            type: 2,
            label: "합14",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_14 + "_" + board_id,
          },
          {
            type: 2,
            label: "합12",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_12 + "_" + board_id,
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
            custom_id: "DiceGameBet_" + BetType.SINGLE_5 + "_" + board_id,
          },
          {
            type: 2,
            label: "6",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SINGLE_6 + "_" + board_id,
          },
          {
            type: 2,
            label: "합8",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_8 + "_" + board_id,
          },
          {
            type: 2,
            label: "합13",
            style: 1,
            custom_id: "DiceGameBet_" + BetType.SUM_13 + "_" + board_id,
          },
        ],
      },
    ],
  };

  const url2 = `https://discord.com/api/v10/channels/${diceBoard.channel_id}/messages/${diceBoard.message_id}`;
  const response2 = await axios.patch(url2, buttonData, {
    headers: DISCORD_HEADER,
  });
};

export default CreateDiceBoard;

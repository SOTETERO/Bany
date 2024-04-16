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
    ResetSicbo();
  }
};

const UpdateSicbo = async (sicboGame) => {
  const { channel_id, message_id } = sicboGame;

  const TOKEN = process.env.TOKEN;
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages/${message_id}`;

  const headers = {
    Authorization: `Bot ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die:",
        fields: [
          {
            name: `남은 시간 : `,
            value: `${remainingTime}`,
            inline: true,
          },
          {
            name: `DICE`,
            value: `${dices[0]} ${dices[1]} ${dices[2]}`,
          },
          {
            name: `합`,
            value: `${sum}`,
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
            custom_id: `sicbo_odd ${message_id}`,
          },
          {
            type: 2,
            label: "짝",
            style: 1,
            custom_id: `sicbo_even ${message_id}`,
          },
        ],
      },
    ],
  };

  axios
    .patch(url, data, { headers })
    .then((response) => {})
    .catch((error) => {
      console.log("Error:", error.message);
    });
};

const ResetSicbo = async () => {
  startTime = performance.now();
  remainingTime = performance.now();

  dices[0] = Math.floor(Math.random() * 6 + 1);
  dices[1] = Math.floor(Math.random() * 6 + 1);
  dices[2] = Math.floor(Math.random() * 6 + 1);

  sum = dices[0] + dices[1] + dices[2];
};

export default UpdateSicboGames;

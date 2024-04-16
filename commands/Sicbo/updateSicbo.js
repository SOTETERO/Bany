import { sicboGames } from "./sicboGame.js";

import axios from "axios";

let startTime = performance.now();
let remainingTime = performance.now();

const UpdateSicboGames = async () => {
  remainingTime = parseInt(60 - (performance.now() - startTime) / 1000);

  sicboGames.forEach((sicboGame) => {
    UpdateSicbo(sicboGame);
  });

  console.log("test");
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
        description: `남은 시간 : ${remainingTime}`,
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

export default UpdateSicboGames;

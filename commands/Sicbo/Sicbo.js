import axios from "axios";
import { response } from "express";

const sicboGame = [];

const createSicbo = async (channel_id) => {
  const TOKEN = process.env.TOKEN;
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages`;

  const headers = {
    Authorization: `Bot ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die:",
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
            custom_id: "click",
          },
        ],
        components: [
          {
            type: 2,
            label: "짝",
            style: 1,
            custom_id: "click",
          },
        ],
      },
    ],
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Status Code:", response.status);
      console.log("Response Data:", response.data);

      sicboGame.push({ id: response.data.id });
      console.log(sicboGame);
    })
    .catch((error) => {
      console.log("Error:", error.response.status);
      console.log("Error Data:", error.response.data);
    });
};
export default createSicbo;

const destorySicbo = () => {};

const updateSicboTable = () => {};

import { sicboGames } from "./sicboGame.js";

import axios from "axios";

const CreateSicbo = async (channel_id) => {
  const TOKEN = process.env.TOKEN;
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages`;

  const headers = {
    Authorization: `Bot ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die: Loading...",
      },
    ],
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      sicboGames.push({
        channel_id: channel_id,
        message_id: response.data.id,
        betting: [],
      });
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
};
export default CreateSicbo;

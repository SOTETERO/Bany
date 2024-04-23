import { DISCORD_HEADER } from "../../env.js";
import { sicboGames } from "./sicboGame.js";

import axios from "axios";

const CreateSicbo = async (channelId) => {
  const url = `https://discord.com/api/v10/channels/${channelId}/messages`;

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die: Loading...",
      },
    ],
  };

  axios
    .post(url, data, { headers: DISCORD_HEADER })
    .then((response) => {
      sicboGames.push({
        channelId: channelId,
        messageId: response.data.id,
        lastBetting: [],
        betting: [],
      });
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
};
export default CreateSicbo;

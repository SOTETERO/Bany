import { DISCORD_HEADER } from "../../env.js";
import { sicboGames } from "./sicboGame.js";

import axios from "axios";

const CreateSicbo = async (interaction) => {
  const { channelId } = interaction;

  const url = `https://discord.com/api/v10/channels/${channelId}/messages`;

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die:\n Loading...",
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
      console.log("Create sicbo message error");
    });

  await interaction.reply("다이사이");
  await interaction.deleteReply();
};
export default CreateSicbo;

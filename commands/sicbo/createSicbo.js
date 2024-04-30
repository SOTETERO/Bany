import { DISCORD_HEADER } from "../../env.js";
import { QuaryDatabaes } from "../mysql.js";

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

  try {
    const response = await axios.post(url, data, { headers: DISCORD_HEADER });
    const insert_quary = `INSERT INTO sicboBoard (channel_id, message_id, state,stake) values (${channelId}, ${
      response.data.id
    }, 1, ${1000})`;

    await QuaryDatabaes(insert_quary);
  } catch (error) {
    console.error("Create sicbo message error: ", error);
  }

  await interaction.reply("다이사이");
  await interaction.deleteReply();
};
export default CreateSicbo;

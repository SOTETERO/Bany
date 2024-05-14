import axios from "axios";

import { DISCORD_HEADER } from "../../env.js";
import { QuaryDatabaes } from "../mysql.js";
import { diceBoard } from "./DiceBoard.js";

const CreateDiceBoard = async (interaction) => {
  const { channelId } = interaction;

  const url = `https://discord.com/api/v10/channels/${channelId}/messages`;

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die:\n Loading...",
      },
    ],
  };

  const response = await axios.post(url, data, { headers: DISCORD_HEADER });

  diceBoard.push({
    channel_id: channelId,
    message_id: response.data.id,
    stake: 1000,
  });

  await interaction.reply("주사위 게임 생성");
  await interaction.deleteReply();
};
export default CreateDiceBoard;

import { DISCORD_HEADER } from "../../env.js";
import axios from "axios";

const CreateMessage = (channel_id, message) => {
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages`;

  const data = {
    content: message,
    // tts: false,
    // embeds: [],
    // attachments: "",
    // components: [],
    // sticker_ids: [],
    // flags: "",
  };

  axios.post(url, data, { headers: DISCORD_HEADER });
};

export default CreateMessage;

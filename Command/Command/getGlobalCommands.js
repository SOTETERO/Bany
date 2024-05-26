import axios from "axios";
import { DISCORD_HEADER, APPLICATION_ID } from "../../env.js";

const GetGlobalCommands = async () => {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

  const response = await axios.get(url, { headers: DISCORD_HEADER });

  return response.data;
};

export default GetGlobalCommands;

import axios from "axios";
import { DISCORD_HEADER, APPLICATION_ID } from "../../env.js";
import GetGlobalCommands from "./getGlobalCommands.js";

const DeleteGlobalCommand = async (command_id) => {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands/`;

  const response = await axios.delete(url + command_id, {
    headers: DISCORD_HEADER,
  });
};

export default DeleteGlobalCommands;

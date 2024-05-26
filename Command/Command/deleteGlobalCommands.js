import axios from "axios";
import { DISCORD_HEADER, APPLICATION_ID } from "../../env.js";
import GetGlobalCommands from "./getGlobalCommands.js";

const DeleteGlobalCommands = async () => {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands/`;

  const commands = await GetGlobalCommands();

  for (let i = 0; i < commands.length; i++) {
    const response = await axios.delete(url + commands[i].DISCORD_HEADER, {
      headers: DISCORD_HEADER,
    });
  }
};

export default DeleteGlobalCommands;

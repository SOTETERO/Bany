import { Client, GatewayIntentBits, User } from "discord.js";

import { token } from "./config.js";

import CreateSicbo from "./commands/sicbo/createSicbo.js";
import UpdateSicboGames from "./commands/sicbo/updateSicbo.js";
import Betting from "./commands/sicbo/betting.js";

const bany = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bany.on("ready", () => {
  console.log(`${bany.user.tag} 에 로그인됨`);

  const sicboUpdateInterval = setInterval(() => {
    UpdateSicboGames();
  }, 1000);
});

bany.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
});

bany.on("interactionCreate", async (interaction) => {
  const { commandName, user, customId, channelId } = interaction;
  if (interaction.isCommand()) {
    if (commandName == "출석체크") {
      await interaction.reply(`User: ${user.username}#${user.discriminator}`);
    } else if (commandName == "다이사이") {
      await interaction.reply(`다이사이 보드판을 만듭니다.`);
      CreateSicbo(channelId);
    }
  } else if (interaction.isButton()) {
    if ("sicbo_odd" == customId.substr(0, 9)) {
      Betting(channelId, customId.substr(10), user, 1);
    } else if ("sicbo_even" == customId.substr(0, 10)) {
      console.log(customId.substr(11));
    }
  }
});

bany.login(token);

import { Client, GatewayIntentBits, User } from "discord.js";

import { token } from "./config.js";

import AttendanceCheck from "./commands/AttendanceCheck.js";
import CreateMessage from "./commands/createMessage.js";
import createSicbo from "./commands/Sicbo/Sicbo.js";

const bany = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bany.on("ready", () => console.log(`${bany.user.tag} 에 로그인됨`));

bany.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  console.log(msg.channel.id);

  if (msg.content == "Die") {
    console.log(msg.channel.id);
    createSicbo(msg.channel.id);
  }
});

bany.on("interactionCreate", async (interaction) => {
  const { commandName, user, customId, channelId } = interaction;
  if (interaction.isCommand()) {
    if (commandName == "출석체크") {
      await interaction.reply(`User: ${user.username}#${user.discriminator}`);
    } else if (commandName == "다이사이") {
      await interaction.reply(`다이사이 보드판을 만듭니다.`);
      createSicbo(channelId);
    }
  } else if (interaction.isButton()) {
    if (customId == "click") {
      console.log("호출");
      //await interaction.reply(`돈 넣음`);
    }
  }
});

bany.login(token);

import { Client, GatewayIntentBits, User } from "discord.js";

import { token } from "./config.js";

import AttendanceCheck from "./commands/AttendanceCheck.js";

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
});

bany.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, user } = interaction;

  if (commandName == "출석체크") {
    await interaction.reply(`User: ${user.username}#${user.discriminator}`);
  }
});

bany.login(token);

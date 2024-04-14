import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

import { token } from "./config.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => console.log(`${client.user.tag} 에 로그인됨`));

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  console.log(msg.channel.id);
});

client.login(token);

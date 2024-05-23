import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

import { racings } from "./racing.js";
import { Command } from "../command.js";

const CreateRacing = async (interaction) => {
  await interaction.reply("준비중");
  await interaction.deleteReply();

  const { channel } = interaction;
  const id = racings.length;

  const embed = new EmbedBuilder().setTitle("경마장 생성");
  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`${Command.RACING_BET1}_${id}`)
      .setLabel("1")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`${Command.RACING_BET2}_${id}`)
      .setLabel("2")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`${Command.RACING_BET3}_${id}`)
      .setLabel("3")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`${Command.RACING_BET4}_${id}`)
      .setLabel("4")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`${Command.RACING_BET5}_${id}`)
      .setLabel("5")
      .setStyle(ButtonStyle.Primary)
  );

  const data = {
    embeds: [embed],
    components: [buttons],
  };

  const message = await channel.send(data);

  racings.push({
    id: id,
    message: message,
    horses: [0, 0, 0, 0, 0],
    rank: [],
    stake: 1000,
    bets: [],
    results: [],
  });
};

export default CreateRacing;

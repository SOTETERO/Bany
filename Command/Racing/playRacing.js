import { EmbedBuilder } from "discord.js";

const PlayRacing = async (racing) => {
  const { message, horses } = racing;

  let stadium = "";

  for (var i = 0; i < 5; i++) {
    horses[i] += Math.floor(Math.random() * 10);
    horses[i] = Math.min(horses[i], 60);

    let horse_line =
      "🚩............................................................";
    horse_line =
      horse_line.substring(0, 61 - horses[i] + 1) +
      "🏇" +
      horse_line.substring(61 - horses[i] + 1);

    stadium += horse_line + "\n";
  }

  const embed = new EmbedBuilder().setTitle("경마").setDescription(stadium);

  const data = {
    embeds: [embed],
  };

  await message.edit(data);
};

export default PlayRacing;

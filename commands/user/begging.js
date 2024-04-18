import { EmbedBuilder } from "@discordjs/builders";
import GetUser from "./getUser.js";

const Begging = async (interaction) => {
  const user = GetUser(interaction.user.id);

  if (typeof user == "undefined") {
    console.log("유저가 등록이 안되어있음.");
  } else {
    user.coin += 10000;

    const embed = new EmbedBuilder()
      .setTitle("구걸")
      .setDescription(`구걸중`)
      .setFields(
        { name: `얻은 코인`, value: `${10000}` },
        { name: `현재 코인`, value: `${user.coin}` }
      );
    await interaction.reply({ embeds: [embed] });
  }
};

export default Begging;

import { EmbedBuilder } from "@discordjs/builders";
import GetUser from "./getUser.js";

const BalanceInquiry = async (interaction) => {
  const user = GetUser(interaction.user.id);

  if (typeof user == "undefined") {
    console.log("유저가 등록이 안되어있음.");
  } else {
    const embed = new EmbedBuilder()
      .setTitle("잔액조회")
      .setFields({ name: `현재 코인`, value: `${user.coin}` });
    await interaction.reply({ embeds: [embed] });
  }
};

export default BalanceInquiry;

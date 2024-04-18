import { EmbedBuilder } from "discord.js";

import { userDatas } from "./userDatas.js";

const startCoin = 5000;

/**
 * 유저 데이터를 만듭니다.
 */
const RegisterUser = async (interaction) => {
  const { user } = interaction;

  const userData = userDatas.find((userData) => userData.id === user.id);

  if (typeof userData == "undefined") {
    userDatas.push({
      id: user.id,
      nickname: user.username,
      coin: startCoin,
    });

    const embed = new EmbedBuilder()
      .setTitle("회원가입 완료")
      .setDescription(`환영합니다, ${user.username}!`);
    await interaction.reply({ embeds: [embed] });
  } else {
    const embed = new EmbedBuilder()
      .setTitle("회원가입 실패")
      .setDescription(`이미 등록되었습니다.`);
    await interaction.reply({ embeds: [embed] });
  }
};

export default RegisterUser;

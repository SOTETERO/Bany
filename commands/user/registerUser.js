import { EmbedBuilder } from "discord.js";
import { QuaryDatabaes } from "../mysql.js";

const startCoin = 5000;

const RegisterUser = async (interaction) => {
  const { user } = interaction;

  const select_quary = `SELECT * FROM user WHERE discord_id = ${user.id}`;
  const userData = await QuaryDatabaes(select_quary);

  if (userData.length == 0) {
    const koreaTime = new Date(new Date().getTime() + 9 * 3600 * 1000);
    const formattedTime = new Date(koreaTime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const insert_quary = `INSERT INTO user (discord_id, coin, registration_time, attendance_time, begging_time) values (${user.id}, ${startCoin}, '${formattedTime}', '${formattedTime}', '${formattedTime}');`;
    await QuaryDatabaes(insert_quary);

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

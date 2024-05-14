import { EmbedBuilder } from "@discordjs/builders";
import { QuaryDatabaes } from "../mysql.js";

const beggingCoin = 10000;

const Begging = async (interaction) => {
  const select_quary = `SELECT * FROM user WHERE discord_id = ${interaction.user.id}`;
  let userData = await QuaryDatabaes(select_quary);

  if (userData.length == 1) {
    userData = userData[0];

    const lastBegging = new Date(userData.begging_time);
    lastBegging.setHours(lastBegging.getHours() + 9);

    const koreaTime = new Date(new Date().getTime() + 9 * 3600 * 1000);
    const formattedTime = new Date(koreaTime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const beggingTime = Math.abs(koreaTime - lastBegging) / 36e5;

    if (beggingTime >= 0.08333333) {
      const coin = userData.coin + beggingCoin;
      const update_quary = `UPDATE user SET coin = ${coin}, begging_time = '${formattedTime}' WHERE discord_id = ${interaction.user.id}`;
      await QuaryDatabaes(update_quary);

      const embed = new EmbedBuilder()
        .setTitle("구걸 성공")
        .setDescription(`10000원 지급.`);
      await interaction.reply({ embeds: [embed] });
    } else {
      const remainingHours = 0.0833333333333 - beggingTime;
      const hrs = Math.floor(remainingHours);
      const mins = Math.floor((remainingHours - hrs) * 60);
      const secs = Math.round(((remainingHours - hrs) * 60 - mins) * 60);

      const embed = new EmbedBuilder()
        .setTitle("구걸 실패")
        .setDescription(
          `시간이 부족합니다. 남은 시간: ${hrs}시간 ${mins}분 ${secs}초.`
        );
      await interaction.reply({ embeds: [embed] });
    }
  } else {
    const embed = new EmbedBuilder()
      .setTitle("구걸 실패")
      .setDescription(`회원가입을 해야합니다.`);
    await interaction.reply({ embeds: [embed] });
  }
};

export default Begging;

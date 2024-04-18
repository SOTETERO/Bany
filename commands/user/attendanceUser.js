import { EmbedBuilder } from "@discordjs/builders";
import GetUser from "./getUser.js";

const attendanceCoin = 1000;

const AttendanceUser = async (interaction) => {
  const user = GetUser(interaction.user.id);

  if (typeof user == "undefined") {
    console.log("유저가 등록이 안되어있음.");
  } else {
    console.log(Date.now() - user.attendanceTime);
    if (Date.now() - user.attendanceTime > 24 * 60 * 60 * 1000) {
      user.coin += attendanceCoin;
      user.attendanceTime = Date.now();

      const embed = new EmbedBuilder()
        //로그 저장해야됨
        .setTitle("출석체크 완료")
        .setDescription(`남은 코인 : ${user.coin}`);
      await interaction.reply({ embeds: [embed] });
    } else {
      let remainTime = new Date(
        24 * 60 * 60 * 1000 - (Date.now() - user.attendanceTime)
      );
      //로그 저장해야됨
      const embed = new EmbedBuilder()
        .setTitle("출석체크 실패")
        .setDescription(`24시간이 안지났습니다`)
        .setFields({
          name: `남은시간`,
          value: `${remainTime.getUTCHours()}:${remainTime.getUTCMinutes()}:${remainTime.getUTCSeconds()}`,
        });
      await interaction.reply({ embeds: [embed] });
    }
  }
};

export default AttendanceUser;

import { Client, GatewayIntentBits, User } from "discord.js";

import CreateSicbo from "./commands/sicbo/createSicbo.js";
import UpdateSicboGames from "./commands/sicbo/updateSicbo.js";
import Betting from "./commands/sicbo/betting.js";
import RegisterUser from "./commands/user/registerUser.js";
import AttendanceUser from "./commands/user/attendanceUser.js";
import { TOKEN } from "./env.js";
import Begging from "./commands/user/begging.js";
import BalanceInquiry from "./commands/user/balanceInquiry.js";

const bany = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bany.on("ready", () => {
  console.log(`${bany.user.tag} 에 로그인됨`);

  const sicboUpdateInterval = setInterval(() => {
    UpdateSicboGames();
  }, 1000);
});

bany.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
});

bany.on("interactionCreate", async (interaction) => {
  const { commandName, user, customId, channelId } = interaction;
  if (interaction.isCommand()) {
    if (commandName == "회원가입") {
      await RegisterUser(interaction);
    } else if (commandName == "출석체크") {
      await AttendanceUser(interaction);
    } else if (commandName == "구걸") {
      await Begging(interaction);
    } else if (commandName == "잔액조회") {
      await BalanceInquiry(interaction);
    } else if (commandName == "다이사이") {
      await interaction.reply(`다이사이 보드판을 만듭니다.`);
      CreateSicbo(channelId);
    }
  } else if (interaction.isButton()) {
    if ("sicboBet" == customId.substr(0, 8)) {
      let betType = customId.substr(9, 2);
      let message_id = customId.substr(12);

      Betting(channelId, message_id, user, betType);
      await interaction.reply("abc");
      await interaction.deleteReply();
    }
  }
});

bany.login(TOKEN);

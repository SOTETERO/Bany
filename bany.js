import { Client, GatewayIntentBits, User } from "discord.js";

import CreateSicbo from "./commands/sicbo/createSicbo.js";
import UpdateSicboGames from "./commands/sicbo/updateSicbo.js";
import Betting from "./commands/sicbo/betting.js";
import RegisterUser from "./commands/user/registerUser.js";
import AttendanceUser from "./commands/user/attendanceUser.js";
import { TOKEN } from "./env.js";
import Begging from "./commands/user/begging.js";
import BalanceInquiry from "./commands/user/balanceInquiry.js";
import GetCoin from "./commands/user/getUserCoin.js";
import { QuaryDatabaes } from "./commands/mysql.js";
import DiscordMessage from "./commands/Discord/discordMessage.js";

const bany = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bany.on("ready", async () => {
  const quaary = `truncate sicboBoard`;
  await QuaryDatabaes(quaary);
  const quaary2 = `truncate sicboBet`;
  await QuaryDatabaes(quaary2);

  const sicboUpdateInterval = setInterval(() => {
    UpdateSicboGames();
  }, 1000);

  DiscordMessage("1229377844908396577", "하이");
});

bany.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
});

bany.on("interactionCreate", async (interaction) => {
  const { commandName, nickname, customId, channelId } = interaction;
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
      await CreateSicbo(interaction);
    }
  } else if (interaction.isButton()) {
    if ("sicboBet" == customId.substr(0, 8)) {
      await Betting(interaction);
    }
  }
});

bany.login(TOKEN);

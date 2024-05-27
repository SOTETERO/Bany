import { Client, GatewayIntentBits, User } from "discord.js";

import CreateDiceBoard from "./Command/DiceGame/createDiceBoard.js";
import UpdateSicboGames from "./Command/DiceGame/updateSicbo.js";
import Betting from "./Command/DiceGame/betting.js";
import RegisterUser from "./Command/user/registerUser.js";
import AttendanceUser from "./Command/user/attendanceUser.js";
import { TOKEN } from "./env.js";
import Begging from "./Command/user/begging.js";
import BalanceInquiry from "./Command/user/balanceInquiry.js";
import { QuaryDatabaes } from "./Command/mysql.js";
import CreateRacing from "./Command/Racing/createRacing.js";

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
      await CreateDiceBoard(interaction);
    } else if (commandName == "경마장") {
      await CreateRacing(interaction);
    }
  } else if (interaction.isButton()) {
    if ("DiceGameBet" == customId.substr(0, 11)) {
      await Betting(interaction);
    }
  }
});

bany.login(TOKEN);

import GetUser from "../user/getUser.js";
import { userDatas } from "../user/userDatas.js";
import { sicboGames } from "./sicboGame.js";

const Betting = async (interaction) => {
  const { channelId, customId, user } = interaction;

  let betType = customId.substr(9, 2);
  let messageId = customId.substr(12);

  const gameInfo = sicboGames.find(
    (game) => game.channelId === channelId && game.messageId === messageId
  );

  let bettingInfo = gameInfo.betting.find(
    (betting) => betting.userId === user.id && betting.type === betType
  );

  if (typeof bettingInfo == "undefined") {
    bettingInfo = {
      userId: user.id,
      globalName: user.globalName,
      type: betType,
      betting: 0,
    };
    gameInfo.betting.push(bettingInfo);
  }

  const userData = GetUser(bettingInfo.userId);

  if (userData.coin - 1000 >= 0) {
    userData.coin -= 1000;
    bettingInfo.betting += 1000;
  } else {
    console.log(`user.globalName : 돈 부족`);
  }

  await interaction.reply(`배팅합니다.`);
  await interaction.deleteReply();
};

export default Betting;

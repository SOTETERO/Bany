import GetUser from "../user/getUser.js";
import { userDatas } from "../user/userDatas.js";
import { sicboGames } from "./sicboGame.js";

const Betting = (channelId, messageId, userId, type) => {
  const gameInfo = sicboGames.find(
    (game) => game.channelId === channelId && game.messageId === messageId
  );

  let bettingInfo = gameInfo.betting.find(
    (user) => user.userId === userId && user.type === type
  );

  if (typeof bettingInfo == "undefined") {
    bettingInfo = { userId: userId, type: type, betting: 0 };
    gameInfo.betting.push(bettingInfo);
  }

  const user = GetUser(userId);

  if (user.coin - 1000 >= 0) {
    user.coin -= 1000;
    bettingInfo.betting += 1000;

    console.log(`user.globalName : 돈 부족`);
  }

  console.log(userDatas);
};

export default Betting;

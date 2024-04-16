import { sicboGames } from "./sicboGame.js";

const Betting = (channel_id, message_id, user_id, type) => {
  const gameInfo = sicboGames.find(
    (game) => game.channel_id === channel_id && game.message_id === message_id
  );

  let bettingInfo = gameInfo.betting.find(
    (user) => user.user_id === user_id && user.type === type
  );

  if (typeof bettingInfo == "undefined") {
    bettingInfo = { user_id: user_id, type: type, betting: 0 };
    gameInfo.betting.push(bettingInfo);
  }

  bettingInfo.betting += 1000;

  console.log(gameInfo);
};

export default Betting;

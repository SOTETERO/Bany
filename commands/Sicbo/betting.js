import { sicboGames } from "./sicboGame.js";

const Betting = (channel_id, message_id, user_id, bet_type) => {
  const gameInfo = sicboGames.find(
    (game) => game.channel_id === channel_id && game.message_id === message_id
  );

  let bettingInfo = gameInfo.betting.find(
    (user) => user.user_id === user_id && bet_type === bet_type
  );

  if (typeof bettingInfo == "undefined") {
    bettingInfo = { user_id: user_id, bet_type: bet_type, betting: 0 };
    gameInfo.betting.push(bettingInfo);
  }

  bettingInfo.betting += 1000;

  console.log(gameInfo);
};

export default Betting;

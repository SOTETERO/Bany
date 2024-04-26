import GetUser from "../user/getUser.js";
import { sicboGames } from "./sicboGame.js";

const Betting = async (interaction) => {
  const { user, customId } = interaction;

  const betType = customId.substr(9, 2);
  const boardId = customId.substr(12);

  const board = sicboGames.find((game) => game.id == boardId);
  const userData = GetUser(user.id);

  if (typeof userData == "undefined") {
    await interaction.reply(`회원가입 안됬음.`);
    await interaction.deleteReply();
    return;
  }

  if (userData.coin < board.stake) {
    //판돈이 많은 경우
    await interaction.reply(`돈이 부족 합니다.`);
    await interaction.deleteReply();
  } else {
    //판돈 있는지 체크후 없으면 betting 데이터 넣기
    let bettingInfo = board.betting.find(
      (betting) => betting.userId === user.id && betting.type === betType
    );

    if (typeof bettingInfo == "undefined") {
      bettingInfo = {
        userId: user.id,
        userData: userData,
        type: betType,
        betting: 0,
      };
      board.betting.push(bettingInfo);
    }

    userData.coin -= board.stake;
    bettingInfo.betting += board.stake;

    await interaction.reply(`배팅합니다.`);
    await interaction.deleteReply();
  }
};

export default Betting;

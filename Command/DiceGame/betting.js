import { QuaryDatabaes } from "../mysql.js";
import { diceBoards } from "./DiceBoard.js";

const Betting = async (interaction) => {
  const { user, nickname, customId } = interaction;

  const betType = customId.substr(12, 2);
  const board_id = customId.substr(15);

  console.log("---------");
  console.log(customId);
  console.log(betType);
  console.log(board_id);

  const user_quary = `SELECT * FROM user WHERE discord_id = ${user.id}`;
  let userData = await QuaryDatabaes(user_quary);

  const board = diceBoards[parseInt(board_id)];

  console.log(board);

  if (userData.length == 0) {
    //유저 없음 메시지
  } else {
    userData = userData[0];
    if (userData.coin - board.stake >= 0) {
      //유저 돈 차감
      const coin = userData.coin - board.stake;
      const user_update_quary = `UPDATE user SET coin = ${coin} WHERE discord_id = ${user.id}`;
      await QuaryDatabaes(user_update_quary);
      //배팅 데이터 확인
      //      board.bets.find(bet => bet.board == && bet.type == );
      //     const select_bettting = `SELECT * FROM sicboBet WHERE board_id = ${board_id} AND discord_id = ${user.id} AND bet_type = ${betType}`;
      //     const betting = await QuaryDatabaes(select_bettting);
      //     if (betting.length == 0) {
      //       //배팅 데이터 생성

      //       const insert_betting_quary = `INSERT INTO sicboBet (board_id, discord_id, nickname, bet_type, coin, result) values (${board_id}, '${user.id}', '${interaction.member.nickname}', ${betType} , ${boardData.stake}, false)`;
      //       await QuaryDatabaes(insert_betting_quary);
      //     } else {
      //       //
      //       const betting_update_quary = `UPDATE sicboBet SET coin = ${
      //         betting[0].coin + boardData.stake
      //       } WHERE board_id = ${board_id} AND discord_id = '${
      //         user.id
      //       }' AND bet_type = ${betType}`;
      //       await QuaryDatabaes(betting_update_quary);
      //     }
      //배팅 메시지 적기
    } else {
      // 돈이 없습니다.
    }
  }
};

export default Betting;

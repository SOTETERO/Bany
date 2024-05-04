import { QuaryDatabaes } from "../mysql.js";

const Betting = async (interaction) => {
  const { user, nickname, customId } = interaction;

  const betType = customId.substr(9, 2);
  const board_id = customId.substr(12);

  const user_quary = `SELECT * FROM user WHERE discord_id = ${user.id}`;
  let userData = await QuaryDatabaes(user_quary);

  const board_quary = `SELECT * FROM sicboBoard WHERE id = ${board_id}`;
  let boardData = await QuaryDatabaes(board_quary);

  if (userData.length == 0) {
    //유저 없음 메시지
  } else {
    userData = userData[0];
    boardData = boardData[0];

    if (userData.coin - boardData.stake >= 0) {
      //유저 돈 차감
      const coin = userData.coin - boardData.stake;
      const user_update_quary = `UPDATE user SET coin = ${coin} WHERE discord_id = ${user.id}`;
      await QuaryDatabaes(user_update_quary);
      //배팅 데이터 확인
      const select_bettting = `SELECT * FROM sicboBet WHERE board_id = ${board_id} AND discord_id = ${user.id} AND bet_type = ${betType}`;
      const betting = await QuaryDatabaes(select_bettting);

      if (betting.length == 0) {
        //배팅 데이터 생성
        const insert_betting_quary = `INSERT INTO sicboBet (board_id, discord_id, nickname, bet_type, coin) values (${board_id}, '${user.id}', '${interaction.member.nickname}', ${betType} , ${boardData.stake})`;
        await QuaryDatabaes(insert_betting_quary);
      } else {
        //
        const betting_update_quary = `UPDATE sicboBet SET coin = ${
          betting[0].coin + boardData.stake
        } WHERE board_id = ${board_id} AND discord_id = '${
          user.id
        }' AND bet_type = ${betType}`;
        await QuaryDatabaes(betting_update_quary);
      }

      //배팅 메시지 적기
    } else {
      // 돈이 없습니다.
    }
  }
};

export default Betting;

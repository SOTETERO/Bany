import { QuaryDatabaes } from "../mysql.js";

const GetUserCoin = async (discord_id) => {
  const quary = `SELECT Coin FROM user WHERE discord_id = ${discord_id}`;

  const userData = await QuaryDatabaes(quary);

  if (userData.length == 1) {
    return userData[0].Coin;
  } else {
    //유저 데이터가 없음
    return 0;
  }
};

export default GetUserCoin;

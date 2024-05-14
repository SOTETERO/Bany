import { QuaryDatabaes } from "../mysql.js";
import GetUserCoin from "./getUserCoin.js";

const AddUserCoin = async (discord_id, addCoin) => {
  let coin = await GetUserCoin(discord_id);

  coin = coin + addCoin;

  const quary = `UPDATE user SET coin = ${coin} WHERE discord_id = '${discord_id}'`;

  await QuaryDatabaes(quary);

  return true;
};

export default AddUserCoin;

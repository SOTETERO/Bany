import { userDatas } from "./userDatas.js";

const startCoin = 5000;

/**
 * 유저 데이터를 만듭니다.
 * @param {*} newUser 유저정보
 */
const CreateUser = (newUser) => {
  const userData = userDatas.find((user) => user.id === newUser.id);

  if (typeof userData == "undefined") {
    userDatas.push({
      id: newUser.id,
      globalName: newUser.globalName,
      coin: startCoin,
    });
  }
};

export default CreateUser;

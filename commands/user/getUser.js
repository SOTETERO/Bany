import { userDatas } from "./userDatas.js";

/**
 * 유저 데이터를 가져옵니다.
 * @param {*} id 유저 ID
 * @returns 유저 데이터
 */
const GetUser = (id) => {
  const userData = userDatas.find((user) => user.id === id);

  if (typeof userData == "undefined") {
    return "undefined";
  }
  return userData;
};

export default GetUser;

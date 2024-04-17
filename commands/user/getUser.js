import { userDatas } from "./userDatas.js";

const GetUser = (id) => {
  const userData = userDatas.find((user) => user.id === id);

  if (typeof userData == "undefined") {
    console.log("등록되지 않은 유저 호출");
    return "undefined";
  }
  return userData;
};

export default GetUser;

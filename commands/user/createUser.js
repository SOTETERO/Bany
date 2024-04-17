import { userDatas } from "./userDatas.js";

const CreateUser = (newUser) => {
  const userData = userDatas.find((user) => user.id === newUser.id);

  if (typeof userData == "undefined") {
    userDatas.push({
      id: newUser.id,
      globalName: newUser.globalName,
      coin: 5000,
    });
  }
};

export default CreateUser;

import axios from "axios";

const RegisteringCommand = async () => {
  const APPLICATION_ID = process.env.APPLICATION_ID;
  const TOKEN = process.env.TOKEN;

  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

  const headers = {
    Authorization: `Bot ${TOKEN}`,
  };

  const data = {
    name: "다이사이",
    description: "다이사이 보드판을 만듭니다.",
    options: [],
    z,
  };
  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Status Code:", response.status);
      console.log("Response Data:", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

RegisteringCommand();

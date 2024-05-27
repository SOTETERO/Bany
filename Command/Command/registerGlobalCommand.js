import axios from "axios";
import { DISCORD_HEADER, APPLICATION_ID } from "../env.js";

const RegisteringCommand = async () => {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

  const data = {
    name: "경마장",
    description: "경마장을 생성합니다.",
    options: [],
  };

  axios
    .post(url, data, { headers: DISCORD_HEADER })
    .then((response) => {
      console.log("Status Code:", response.status);
      console.log("Response Data:", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RegisteringCommand;

RegisteringCommand();

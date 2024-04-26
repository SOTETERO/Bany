import axios from "axios";
import { DISCORD_HEADER, APPLICATION_ID } from "../env.js";

const RegisteringCommand = async () => {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

  // const data = {
  //   name: "회원가입",
  //   description: "바니에게 게임을 하고싶다고 말합니다.",
  //   options: [],
  // };

  // const data = {
  //   name: "다이사이",
  //   description: "다이사이 보드판을 만듭니다.",
  //   options: [],
  // };

  // const data = {
  //   name: "구걸",
  //   description: "바니에게 구걸을 합니다.",
  //   options: [],
  // };

  // const data = {
  //   name: "잔액조회",
  //   description: "현재 보유하고 있는 돈을 확인합니다.",
  //   options: [],
  // };

  const sicboBetting = {
    name: "다이사이베팅",
    type: 1,
    description: "다이사이보드판에 베팅을 합니다.",
    options: [
      {
        name: "베팅",
        type: 3,
        description: "베팅 할 것을 정합니다.",
        required: true,
        choices: [
          {
            name: "ODD",
            value: "ODD",
            description: "홀에 베팅합니다.",
          },
          {
            name: "EVEN",
            value: "홀에 베팅합니다",
          },
          {
            name: "BIG",
            value: "홀에 베팅합니다",
          },
          {
            name: "SMALL",
            value: "홀에 베팅합니다",
          },
          {
            name: "합 4",
            value: "SUM_4",
          },
          {
            name: "합 5",
            value: "SUM_5",
          },
          {
            name: "합 6",
            value: "SUM_6",
          },
          {
            name: "합 7",
            value: "SUM_7",
          },
          {
            name: "합 8",
            value: "SUM_8",
          },
          {
            name: "합 9",
            value: "SUM_9",
          },
          {
            name: "합 10",
            value: "SUM_10",
          },
          {
            name: "합 11",
            value: "SUM_11",
          },
          {
            name: "합 12",
            value: "SUM_12",
          },
          {
            name: "합 13",
            value: "SUM_13",
          },
          {
            name: "합 14",
            value: "SUM_14",
          },
          {
            name: "합 15",
            value: "SUM_15",
          },
          {
            name: "합 16",
            value: "SUM_16",
          },
          {
            name: "합 17",
            value: "SUM_17",
          },
          {
            name: "SINGLE_1",
            value: "SINGLE_1",
          },
          {
            name: "SINGLE_2",
            value: "SINGLE_2",
          },
          {
            name: "SINGLE_3",
            value: "SINGLE_3",
          },
          {
            name: "SINGLE_4",
            value: "SINGLE_4",
          },
          {
            name: "SINGLE_5",
            value: "SINGLE_5",
          },
          {
            name: "SINGLE_6",
            value: "SINGLE_6",
          },
        ],
      },
      {
        name: "베팅금액",
        type: 4,
        description: "짝에 베팅합니다",
        required: true,
      },
    ],
  };

  axios
    .post(url, sicboBetting, { headers: DISCORD_HEADER })
    .then((response) => {
      console.log("Status Code:", response.status);
      console.log("Response Data:", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

RegisteringCommand();

import { sicboGames } from "./sicboGame.js";

import axios from "axios";

let startTime = performance.now();
let remainingTime = performance.now();
let gameTime = 20;

let dices = [1, 1, 1];
let sum = 3;

const UpdateSicboGames = async () => {
  remainingTime = parseInt(gameTime - (performance.now() - startTime) / 1000);

  sicboGames.forEach((sicboGame) => {
    UpdateSicbo(sicboGame);
  });

  if (remainingTime <= 0) {
    ResetSicbo();
  }
};

const UpdateSicbo = async (sicboGame) => {
  const { channel_id, message_id } = sicboGame;

  const TOKEN = process.env.TOKEN;
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages/${message_id}`;

  const headers = {
    Authorization: `Bot ${TOKEN}`,
    "Content-Type": "application/json",
  };

  let lastGameValue = "";
  sicboGame.lastBetting.forEach((bet) => {
    const user_id = bet.user_id;
    const betting = bet.betting;
    const obtained = bet.obtained;

    lastGameValue += `${user_id} : ${betting} => ${obtained}\n`;
  });

  let obb_value = "";
  let even_value = "";
  sicboGame.betting.forEach((bet) => {
    const user_id = bet.user_id;
    const type = bet.type;
    const betting = bet.betting;

    switch (type) {
      case "01":
        obb_value += `${user_id} : ${betting}\n`;
        break;
      case "02":
        even_value += `${user_id} : ${betting}\n`;
        break;
      default:
    }
  });

  const data = {
    embeds: [
      {
        title: ":game_die: 다이 사이 :game_die:",
        fields: [
          {
            name: `지난게임결과`,
            value: lastGameValue,
          },
          {
            name: `홀`,
            value: obb_value,
          },
          {
            name: `짝`,
            value: even_value,
          },
          {
            name: `남은 시간 : `,
            value: `${remainingTime}`,
            inline: true,
          },
          {
            name: `DICE`,
            value: `${dices[0]} ${dices[1]} ${dices[2]}`,
          },
          {
            name: `합`,
            value: `${sum}`,
          },
        ],
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "홀",
            style: 1,
            custom_id: `sicboBet_${"01"}_${message_id}`,
          },
          {
            type: 2,
            label: "짝",
            style: 1,
            custom_id: `sicboBet_${"02"}_${message_id}`,
          },
        ],
      },
    ],
  };

  axios
    .patch(url, data, { headers })
    .then((response) => {})
    .catch((error) => {
      console.log("Error:", error.message);
    });
};

const ResetSicbo = async () => {
  startTime = performance.now();
  remainingTime = performance.now();

  dices[0] = Math.floor(Math.random() * 6 + 1);
  dices[1] = Math.floor(Math.random() * 6 + 1);
  dices[2] = Math.floor(Math.random() * 6 + 1);

  sum = dices[0] + dices[1] + dices[2];

  sicboGames.forEach((game) => {
    game.lastBetting = [];

    game.betting.forEach((bet) => {
      let bettingInfo = game.lastBetting.find(
        (user) => user.user_id === bet.user_id
      );

      if (typeof bettingInfo == "undefined") {
        bettingInfo = { user_id: bet.user_id, betting: 0, obtained: 0 };
        game.lastBetting.push(bettingInfo);
      }

      switch (bet.type) {
        case "01":
          bettingInfo.betting += bet.betting;
          if (sum % 2 == 1) {
            bettingInfo.obtained += bet.betting * 2;
          }
          break;
        case "02":
          bettingInfo.betting += bet.betting;
          if (sum % 2 == 0) {
            bettingInfo.obtained += bet.betting * 2;
          }
          break;
        default:
      }
    });

    game.betting = [];
  });
};

export default UpdateSicboGames;

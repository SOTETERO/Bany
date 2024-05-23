import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { racings } from "./racing";

import { Command } from "../command";

const CreateRacing = async (interaction) => {
  await interaction.reply("준비중");
  await interaction.deleteReply();

  const { channel } = interaction;
  const board_id = racings.length;

  const embed = new MessageEmbed().setTitle("경마장 생성");
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId(`${Command.RACING_BET1}_${board_id}`)
      .setLabel("1")
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId(`${Command.RACING_BET2}_${board_id}`)
      .setLabel("2")
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId(`${Command.RACING_BET3}_${board_id}`)
      .setLabel("3")
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId(`${Command.RACING_BET4}_${board_id}`)
      .setLabel("4")
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId(`${Command.RACING_BET5}_${board_id}`)
      .setLabel("5")
      .setStyle("PRIMARY")
  );

  const data = {
    embeds: [embed],
    component: [row],
  };

  const message = await channel.send(data);

  // const data = {
  //   embeds: [
  //     {
  //       title: "경마장 생성",
  //     },
  //   ],
  // };

  // const url1 = `https://discord.com/api/v10/channels/${channelId}/messages`;
  // const response1 = await axios.post(url1, data, { headers: DISCORD_HEADER });

  // const board_id = diceBoards.length;

  // //보드 등록
  // const racing = {
  //   id: board_id,
  //   channel_id: channelId,
  //   message_id: response1.data.id,
  //   stake: 1000,
  //   bets: [],
  // };
  // racings.push(racing);

  // //버튼 생성 메시지
  // const buttonData = {
  //   embeds: [
  //     {
  //       title: "버튼 생성",
  //     },
  //   ],

  //   components: [
  //     {
  //       type: 1,
  //       components: [
  //         {
  //           type: 2,
  //           label: "1",
  //           style: 1,
  //           custom_id: "RacingBet" + 1 + "_" + board_id,
  //         },
  //         {
  //           type: 2,
  //           label: "2",
  //           style: 1,
  //           custom_id: "RacingBet" + BetType.EVEN + "_" + board_id,
  //         },
  //         {
  //           type: 2,
  //           label: "3",
  //           style: 1,
  //           custom_id: "DiceGameBet_" + BetType.SUM_4 + "_" + board_id,
  //         },
  //         {
  //           type: 2,
  //           label: "4",
  //           style: 1,
  //           custom_id: "DiceGameBet_" + BetType.SUM_17 + "_" + board_id,
  //         },
  //         {
  //           type: 2,
  //           label: "5",
  //           style: 1,
  //           custom_id: "DiceGameBet_" + BetType.SUM_9 + "_" + board_id,
  //         },
  //       ],
  //     },
  //   ],
  // };

  // const url2 = `https://discord.com/api/v10/channels/${diceBoard.channel_id}/messages/${diceBoard.message_id}`;
  // const response2 = await axios.patch(url2, buttonData, {
  //   headers: DISCORD_HEADER,
  // });
};

export default CreateRacing;

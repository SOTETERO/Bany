const AttendanceCheck = async ({ interaction }) => {
  const user = interaction.user;
  await interaction.reply(`User: ${user.username}#${user.discriminator}`);
};

export default AttendanceCheck;

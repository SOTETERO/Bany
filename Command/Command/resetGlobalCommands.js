import DeleteGlobalCommands from "./deleteGlobalCommands.js";

const ResetGlobalCommands = async () => {
  await DeleteGlobalCommands();
};

export default ResetGlobalCommands;

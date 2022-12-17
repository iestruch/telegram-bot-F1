export const isCondition = (condition, command) => {
  const regex = new RegExp(condition, "ig");
  // console.log(condition, command, regex.test(command.text))
  return regex.test(command);
};

export const replace = (condition, command, text) => {
  const regex = new RegExp(condition, "ig");
  // console.log(condition, command, regex.test(command.text))
  return command.replace(regex,"");
};


export const isBotCalled = (command) => {
  const regexp = new RegExp(`^${process.env.BOT_NAME_INVOCATION}`);
  return regexp.test(command.text);
};

export const sendMessage = async (bot, message, text) => {
  const chat = message?.chat || body.my_chat_member?.chat;
  const { id } = chat;
  await bot.sendMessage(id, text);
};

export const isAdminUser = async (bot, chatId, userId) => {
  const user = await bot.getChatMember(chatId, userId);
  if (user.status == "creator" || user.status == "administrator") {
    return true;
  }
  return false;
};

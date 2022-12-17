import {
  findAllPerson,
  setPeopleTemplate,
  clearAllPerson,
  setPodiumTemplate,
  upsertPerson,
  deleteOnePerson,
  addPerson,
} from "./getPerson";
import { commands, messages } from "./groupBot.config";
import { isAdminUser, replace, sendMessage } from "./helpers";

export const startAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
  } = ctx;
  const template = `${messages.WELCOME} ${first_name}`;
  await sendMessage(bot, ctx, template);
};

export const greetAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
  } = ctx;
  const template = `${messages.HI} ${first_name}`;
  await sendMessage(bot, ctx, template);
};

export const GroupCreationAction = async (bot, ctx, message) => {
  const {
    chat: { id, title },
    from: { first_name },
  } = ctx;
  await sendMessage(bot, ctx, `${messages.GROUP_CREATION} ${title} 🖖🏻`);
};

export const WelcomeAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
    new_chat_member,
  } = ctx;
  const template = `${messages.NEW_USER} ${new_chat_member.first_name}`;
  await sendMessage(bot, ctx, template);
};

export const LeftAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
    left_chat_member,
  } = ctx;
  const template = `${messages.LEFT_USER} ${left_chat_member.first_name}`;
  await sendMessage(bot, ctx, template);
};

export const getHelpAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
  } = ctx;
  const template = messages.HELP;
  await sendMessage(bot, ctx, template);
};

export const getClasificacion = async (bot, ctx, message, type = 'races') => {
  try {
    const {
      chat: { id },
    } = ctx;

    const clasificacion = await findAllPerson(id, type);
    if (clasificacion.length === 0) {
      await sendMessage(bot, ctx, messages.NO_PARTICIPANTS);
    }
    const template = setPeopleTemplate(clasificacion);
    await sendMessage(bot, ctx, template);
  } catch (error) {
    throw error;
  }
};

export const getPodiumAction = async (bot, ctx, message) => {
  try {
    const {
      chat: { id },
    } = ctx;
    const clasificacion = await findAllPerson(id);
    if (clasificacion.length === 0) {
      await sendMessage(bot, ctx, messages.NO_PARTICIPANTS);
      return;
    }
    const podium = clasificacion.splice(0, 3);
    const template = setPodiumTemplate(podium);
    await sendMessage(bot, ctx, template);
  } catch (error) {
    throw error;
  }
};

export const clearAllAction = async (bot, ctx, message) => {
  try {
    const {
      chat: { id: chatId },
      from: { id: userId },
    } = ctx;
    const isAdmin = await isAdminUser(bot, chatId, userId)
    if (!isAdmin) {
      await sendMessage(bot, ctx, messages.REMOVED_NOT_AUTHORIZED);
      return;
    }
    await clearAllPerson(chatId, 'races');
    await clearAllPerson(chatId, 'sprints');
    await sendMessage(bot, ctx, messages.REMOVED_DONE);
  } catch (error) {
    throw error;
  }
};

export const clearMyAction = async (bot, ctx, message, type = 'races') => {
  try {
    const {
      chat: { id },
      from: { id: userId },
    } = ctx;
    const clasificacion = await deleteOnePerson(userId, id, type);
    await sendMessage(bot, ctx, messages.REMOVED_ONE_DONE);
  } catch (error) {
    throw error;
  }
};

export const addTiempoAction = async (bot, ctx, message, type = 'races') => {
  const {
    chat: { id },
    from: { first_name, id: userId },
  } = ctx;

  const task = type === 'races'? 
    replace(commands.SET_GP_TIME, message,"").trim():
    replace(commands.SET_SP_TIME, message,"").trim();
    
  console.log("task",task)

  try {
    if (!task) {
      throw new Error("Empty date");
    }
    const parsedDate = parsedTime(task);
    if (!parsedDate) {
      throw new Error("Not a Date");
    }
    const tiempo =
      parsedDate.miliseconds +
      parsedDate.seconds * 1000 +
      parsedDate.minutes * 60 * 1000 +
      parsedDate.hours * 24 * 60 * 1000;
    await upsertPerson(userId, first_name, tiempo, id, type);

    await sendMessage(bot, ctx, `${messages.THANKS_PLAYING} ${first_name} 👏🏻`);
  } catch (error) {
    await sendMessage(bot, ctx, `${first_name} ${messages.BAD_TIME_INPUT} 😔`);
    throw error;
  }
};

const parsedTime = (time) => {
  if (!time) {
    return false;
  }

  // TODO: This process fails when this time is sended (1:1) which is invalid
  const arrTime = time.split(/\:|\./);

  if ((arrTime.length === 1) | (arrTime.length > 4)) {
    return null;
  }

  const parsedTime = [
    ...arrTime.reverse().map((num) => parseInt(num, 10)),
    ...new Array(4 - arrTime.length).fill(0),
  ];
  const [miliseconds, seconds, minutes, hours] = parsedTime;

  if (miliseconds > 999 || isNaN(miliseconds)) {
    return null;
  }
  if (seconds > 60 || isNaN(seconds)) {
    return null;
  }
  if (minutes > 60 || isNaN(minutes)) {
    return null;
  }
  if (hours > 24 || isNaN(hours)) {
    return null;
  }

  return { hours, minutes, seconds, miliseconds };
};

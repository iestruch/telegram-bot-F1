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

export const startAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
  } = ctx;
  const template = `${messages.WELCOME} ${first_name}`;
  await bot.sendMessage(id, template, {
    parse_mode: "Markdown",
  });
};

export const greetAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
  } = ctx;
  const template = `${messages.HI} ${first_name}`;
  await bot.sendMessage(id, template, {
    parse_mode: "Markdown",
  });
};

export const GroupCreationAction = async (bot, ctx, message) => {
  const {
    chat: { id, title },
    from: { first_name },
  } = ctx;
  await bot.sendMessage(id, `${messages.GROUP_CREATION} ${title} 🖖🏻`, {
    parse_mode: "Markdown",
  });
};

export const WelcomeAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
    new_chat_member,
  } = ctx;
  const template = `${messages.NEW_USER} ${new_chat_member.first_name}`;
  await bot.sendMessage(id, template, {
    parse_mode: "Markdown",
  });
};

export const LeftAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
    left_chat_member,
  } = ctx;
  const template = `${messages.LEFT_USER} ${left_chat_member.first_name}`;
  await bot.sendMessage(id, template, {
    parse_mode: "Markdown",
  });
};

export const getHelpAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name },
  } = ctx;

  await bot.sendMessage(id, messages.HELP, {
    parse_mode: "Markdown",
  });
};

export const getClasificacion = async (bot, ctx, message) => {
  try {
    const {
      chat: { id },
    } = ctx;

    const clasificacion = await findAllPerson(id);
    if (clasificacion.length === 0) {
      await bot.sendMessage(id, messages.NO_PARTICIPANTS, {
        parse_mode: "Markdown",
      });
    }
    const mensaje = setPeopleTemplate(clasificacion);
    await bot.sendMessage(id, mensaje);
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
      await bot.sendMessage(id, "messages.NO_PARTICIPANTS", {
        parse_mode: "Markdown",
      });
    }
    const podium = clasificacion.splice(0, 3);
    const mensaje = setPodiumTemplate(podium);
    await bot.sendMessage(id, mensaje);
  } catch (error) {
    throw error;
  }
};

export const clearAllAction = async (bot, ctx, message) => {
  try {
    const {
      chat: { id },
    } = ctx;
    const clasificacion = await clearAllPerson(id);
    await bot.sendMessage(id, messages.REMOVED_DONE, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    throw error;
  }
};

export const clearMyAction = async (bot, ctx, message) => {
  try {
    const {
      chat: { id }, from: {id: userId}
    } = ctx;
    const clasificacion = await deleteOnePerson(userId, id);
    await bot.sendMessage(id, messages.REMOVED_ONE_DONE, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    throw error;
  }
};


export const addTiempoAction = async (bot, ctx, message) => {
  const {
    chat: { id },
    from: { first_name, id: userId },
  } = ctx;

  const task = message.replace(commands.SET_TIME, "").trim();

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
    await upsertPerson(userId, first_name, tiempo, id);
    // await addPerson(userId, first_name, tiempo, id);

    await bot.sendMessage(id, `${messages.THANKS_PLAYING} ${first_name} 👏🏻`, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    await bot.sendMessage(id, `${first_name} ${messages.BAD_TIME_INPUT} 😔`, {
      parse_mode: "Markdown",
    });
    throw error;
  }
};

const parsedTime = (time) => {
  if (!time) {
    return false;
  }
  const arrTime = time.split(/\:|\./);

  if ((arrTime.length === 1) | (arrTime.length > 4)) {
    return null;
  }

  const parsedTime = [
    ...arrTime.reverse().map((num) => parseInt(num, 10)),
    ...new Array(4 - arrTime.length).fill(0),
  ];
  const [miliseconds, seconds, minutes, hours] = parsedTime;

  if (miliseconds > 999) {
    return null;
  }
  if (seconds > 60) {
    return null;
  }
  if (minutes > 60) {
    return null;
  }
  if (hours > 24) {
    return null;
  }

  return { hours, minutes, seconds, miliseconds };
};

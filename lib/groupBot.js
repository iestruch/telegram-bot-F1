import {
  addTiempoAction,
  clearAllAction,
  clearMyAction,
  getClasificacion,
  getHelpAction,
  getPodiumAction,
  startAction,
} from "../lib/GroupActionHandler";
import { commands, messages } from "./groupBot.config";
import { isBotCalled, isCondition, sendMessage } from "./helpers";
export const groupBot = async (telegramBot, body) => {
  try {
    // this messages are handled differently as they are no real messages from users
    if (process.env.OFFLINE === "1") {
      await sendMessage(telegramBot, body.message, messages.OFFLINE);
      return;
    }

    if (body.message?.left_chat_participant) {
      await sendMessage(telegramBot, body.message, `${messages.LEFT_USER}`);
      return;
    }

    if (body.message?.new_chat_participant) {
      if (body.message.new_chat_participant.is_bot) {
        await sendMessage(telegramBot, body.message, `${messages.NEW_BOT_USER}`);
      } else {
        await sendMessage(telegramBot, body.message, `${messages.NEW_USER}`);
      }
      return;
    }

    if (!body.message) {
      return;
    }

    // Ensure that this is a message being sent
    if (!isBotCalled(body.message)) {
      return;
    }

    const message = body.message.text
      .replace(process.env.BOT_NAME_INVOCATION, "")
      .trim();
    if (isCondition(`${commands.HI}`, message)) {
      await startAction(telegramBot, body.message, message);
      return;
    } else if (isCondition(`${commands.SET_GP_TIME}`, message)) {
      await addTiempoAction(telegramBot, body.message, message, "races");
    } else if (isCondition(`${commands.SET_SP_TIME}`, message)) {
      await addTiempoAction(telegramBot, body.message, message, "sprints");
    } else if (isCondition(`${commands.GET_GP_CLASIFICATION}`, message)) {
      await getClasificacion(telegramBot, body.message, message, "races");
    } else if (isCondition(`${commands.GET_SP_CLASIFICATION}`, message)) {
      await getClasificacion(telegramBot, body.message, message, "sprints");
    } else if (isCondition(`${commands.GET_PODIUM}`, message)) {
      await getPodiumAction(telegramBot, body.message, message);
    } else if (isCondition(`${commands.AYUDA}`, message)) {
      await getHelpAction(telegramBot, body.message, message);
    } else if (isCondition(`${commands.EMPTY_GP_MINE}`, message)) {
      await clearMyAction(telegramBot, body.message, message, "races");
    } else if (isCondition(`${commands.EMPTY_SP_MINE}`, message)) {
      await clearMyAction(telegramBot, body.message, message, "sprints");
    } else if (isCondition(`${commands.EMPTY}`, message)) {
      await clearAllAction(telegramBot, body.message, message);
    } else {
      await sendMessage(telegramBot, body.message, messages.NOT_UNDERSTAND);
    }
  } catch (error) {
    throw error;
  }
};

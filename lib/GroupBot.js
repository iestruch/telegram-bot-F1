import {
  addTiempoAction,
  clearAllAction,
  clearMyAction,
  getClasificacion,
  getHelpAction,
  getPodiumAction,
  greetAction,
  GroupCreationAction,
  LeftAction,
  WelcomeAction,
} from "./GroupActionHandler";
import { commands, messages } from "./groupBot.config";

export const groupBot = async (telegramBot, body) => {
  try {
    // console.log("groupBot", body);
    // Vamos a usar solo los mensajes que me llaman a mi
    const regex = new RegExp(`@${process.env.BOT_NAME}\s*(?<message>.*)\s*$`);

    if (body?.my_chat_member?.new_chat_member) {
      await WelcomeAction(telegramBot, { message: body.my_chat_member });
      return;
    }

    const entryMessage = body.message || body.edited_message;

    if (entryMessage?.group_chat_created) {
      await GroupCreationAction(telegramBot, entryMessage);
      return;
    }

    if (entryMessage?.new_chat_member) {
      await WelcomeAction(telegramBot, entryMessage);
      return;
    }

    if (entryMessage?.left_chat_member) {
      await LeftAction(telegramBot, entryMessage);
      return;
    }

    const message = regex.exec(entryMessage.text);
    if (!message?.groups) {
      return;
    }
    const botMessage = message.groups?.message?.trim();
    // console.log("botMessage", botMessage);
    // console.log("full message", entryMessage);
    if (!botMessage) {
      return;
    }

    const {
      chat: { id },
    } = entryMessage;

    // Ensure that this is a message being sent
    if (botMessage) {
      // Retrieve the ID for this chat
      // and the text that the user sent

      if (new RegExp(commands.HI, "gi").test(botMessage)) {
        await greetAction(telegramBot, entryMessage, botMessage);
      } else if (new RegExp(commands.SET_TIME, "gi").test(botMessage)) {
        await addTiempoAction(telegramBot, entryMessage, botMessage);
      } else if (
        new RegExp(commands.GET_CLASIFICATION, "gi").test(botMessage)
      ) {
        await getClasificacion(telegramBot, entryMessage, botMessage);
      } else if (new RegExp(commands.EMPTY, "gi").test(botMessage)) {
        await clearAllAction(telegramBot, entryMessage, botMessage);
      } else if (new RegExp(commands.EMPTY_MINE, "gi").test(botMessage)) {
        await clearMyAction(telegramBot, entryMessage, botMessage);
      } else if (new RegExp(commands.GET_PODIUM, "gi").test(botMessage)) {
        await getPodiumAction(telegramBot, entryMessage, botMessage);
      } else if (new RegExp(commands.AYUDA, "gi").test(botMessage)) {
        await getHelpAction(telegramBot, entryMessage, botMessage);
      } else {
        await telegramBot.sendMessage(id, messages.NOT_UNDERSTAND, {
          parse_mode: "Markdown",
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

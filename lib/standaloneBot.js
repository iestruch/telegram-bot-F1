import {
  addTiempoAction,
  clearAllAction,
  getClasificacion,
  getPodiumAction,
  startAction,
  tiempoAction,
} from "./standaloneActionHandler";
import { commands } from "./standaloneBot.config";

export const standaloneBot = async (telegramBot, body) => {
  // Ensure that this is a message being sent
  if (body.message) {
    // Retrieve the ID for this chat
    // and the text that the user sent
    switch (body.message.text) {
      case `/${commands.START}`:
        await startAction(telegramBot, body.message);
        break;
      case `/${commands.SET_TIME}`:
        await tiempoAction(telegramBot, body.message);
        break;
      case `/${commands.GET_CLASIFICATION}`:
        await getClasificacion(telegramBot, body.message);
        break;
      case `/${commands.EMPTY}`:
        await clearAllAction(telegramBot, body.message);
        break;
      case `/${commands.GET_PODIUM}`:
        await getPodiumAction(telegramBot, body.message);
        break;
      default:
        await addTiempoAction(telegramBot, body.message);
        break;
    }
  }
};

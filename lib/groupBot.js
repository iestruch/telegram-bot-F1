import { addTiempoAction, clearAllAction, getClasificacion, getPodiumAction, startAction, tiempoAction } from "./actionHandler";

export const standaloneBot = async (telegramBot, body) => {
    // Ensure that this is a message being sent
    if (body.message) {
        // Retrieve the ID for this chat
        // and the text that the user sent
        switch (body.message.text) {
          case "/start":
            await startAction(telegramBot, body.message);
            break;
          case "/tiempo":
            await tiempoAction(telegramBot, body.message);
            break;
          case "/clasificacion":
            await getClasificacion(telegramBot, body.message);
            break;
          case "/reset":
            await clearAllAction(telegramBot, body.message);
            break;
          case "/podium":
            await getPodiumAction(telegramBot, body.message);
            break;
          default:
            await addTiempoAction(telegramBot, body.message);
            break;
        }
  
      }
}
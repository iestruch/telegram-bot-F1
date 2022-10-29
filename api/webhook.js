// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";

// Require our Telegram helper package
const TelegramBot = require("node-telegram-bot-api");
import { groupBot } from "../lib/GroupBot";
import { standaloneBot } from "../lib/standaloneBot";

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
  try {
    // Create our new bot handler with the token
    // that the Botfather gave us
    // Use an environment variable so we don't expose it in our code
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

    // Retrieve the POST request body that gets sent from Telegram
    const { body } = request;
    // console.log('body message', body);

    const message = body.message || body.edited_message;

    const chat = message?.chat || body.my_chat_member?.chat;

    const { id, type } = chat;

    if ((type === "group") | (type === "supergroup")) {
      await groupBot(bot, body);
    } else {
      await bot.sendMessage(
        id,
        `Usame en un grupo!\nCrea un grupo y añademe @${process.env.BOT_NAME} y empecemos a jugar`
      );
      // await standaloneBot(bot, body);
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error(error);
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  response.send("OK");
};

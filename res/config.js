const { version } = require("./../package.json");
const countapi = require("countapi-js");
const botName = "QnA Bot";
const botAuthorName = "@ShariarHasan";
const botOwnerChatId = 5383663522;
const namespaceForCounter = "ShariarHasan5383663522";
const botVersion = version;
// chat gpt configurations
const gptTemperature = 1.0;
const gptMaxTokens = 2048;
const gptModel = "text-davinci-001";
// ___________________________________________________

// start message
const botStartMessage = `
Welcome to QnA Bot, a question and answer bot powered by OpenAI's GPT language model. Simply ask any question and our bot will provide an answer. Try it out and see what you can learn today.

Click on /help to check all the commands
`;
//   help message

const botHelpMessage = `
You can command me using this commands:

/start - Start the bot and display a welcome message
/help - Display a list of available commands and usage instructions
below commands are under contruction
/about - Display information about the bot and its capabilities
/feedback - Send feedback to the bot's developers
/ratings - Send feedback to the bot's developers
/settings - Adjust the bot's settings, such as language or response time
/history - View your chat history with the bot
/search - Search for a specific question or topic in the bot's knowledge base
/suggest - Suggest a new question or topic for the bot to learn about
`;

const aboutMessage = `
Bot Name : ${botName}
Version : ${botVersion}
Author : ${botAuthorName}
Model Used : ${gptModel}

Welcome to ChatGPT_QnA_Bot, a question and answer bot powered by OpenAI\'s GPT language model, created by ${botAuthorName}
`;
// _______________________________________________________________

// _______________________________________________________________
const keyboardLayout = {
  reply_markup: {
    inline_keyboard: [[{ text: "Okay i Got it", callback_data: "gotit" }]],
  },
};
// __________________________________________________________
module.exports = {
  botName,
  botVersion,
  botStartMessage,
  botHelpMessage,
  gptMaxTokens,
  gptTemperature,
  gptModel,
  keyboardLayout,
  aboutMessage,
  botOwnerChatId,
  namespaceForCounter,
};

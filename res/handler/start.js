const {
  botStartMessage,
  botHelpMessage,
  keyboardLayout,
} = require("../config");

module.exports = (bot) => {
  bot.start((ctx) => {
    //   ctx.reply(botStartMessage);
    bot.telegram.sendMessage(ctx.chat.id, botStartMessage, keyboardLayout);
  });
  // bot.help((ctx) => {
  //   bot.telegram.sendMessage(ctx.chat.id, botHelpMessage, keyboardLayout);
  // });
};

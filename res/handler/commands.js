const {
  botHelpMessage,
  keyboardLayout,
  aboutMessage,
  botOwnerChatId,
  namespaceForCounter,
} = require("../config");
const countapi = require("countapi-js");

module.exports = (bot) => {
  bot.help((ctx) => {
    ctx.reply(botHelpMessage, keyboardLayout);
  });
  // About command
  bot.command("about", (ctx) => {
    countapi
      .get(namespaceForCounter, "totalAskedQuestion")
      .then((res) => {
        ctx.reply(`
${aboutMessage}

Total question answered : ${res.value}
    `);
      })
      .catch((e) => console.log(e));
  });
  //
  //
  //
  //
  // Feedback command
  bot.command("feedback", (ctx) => {
    const input = ctx.message.text.split(" ");
    input.shift();
    if (input.length == 0) {
      ctx.reply(
        "Please provide your feedback after /feedback <Your feedback>\nFor Example: /feedback Thats a very good bot"
      );
    } else {
      const { id, username, first_name, last_name } = ctx.from;
      const feedbackText = input.join(" ");
      const feedback = `
An user has sent a feedback for your bot

User ID : ${id}
Username : @${username}
Full Name : ${first_name} ${last_name}
Users Feedback : ${feedbackText}
`;
      bot.telegram.sendMessage(botOwnerChatId, feedback);

      ctx.reply("Thank you for your feedback!", keyboardLayout);
    }
  });
  //
  //
  //
  //
  // Settings command
  bot.command("settings", (ctx) => {
    ctx.reply("Settings not implemented yet.\nThanks for being with me.");
  });
  //
  //
  //
  //
  // History command
  bot.command("history", (ctx) => {
    ctx.reply("History not implemented yet.\nThanks for being with me.");
  });
  //
  //
  //
  //
  // Search command
  bot.command("search", (ctx) => {
    ctx.reply("Search not implemented yet.\nThanks for being with me.");
  });
  //
  //
  //
  //
  // Suggest command
  bot.command("suggest", (ctx) => {
    ctx.reply("Suggestion not implemented yet.\nThanks for being with me.");
  });
  //
  //
  //
  //
  // Rating command
  bot.command("ratings", (ctx) => {
    ctx.reply("Rate Me", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "1⭐", callback_data: "1" },
            { text: "2⭐", callback_data: "2" },
            { text: "3⭐", callback_data: "3" },
            { text: "4⭐", callback_data: "4" },
            { text: "5⭐", callback_data: "5" },
          ],
          [{ text: "Already Rated", callback_data: "0" }],
        ],
      },
    });
  });
};

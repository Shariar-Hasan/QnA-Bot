const countapi = require("countapi-js");
const { namespaceForCounter } = require("../config");
module.exports = (bot) => {
  bot.action("gotit", (ctx) => {
    ctx.deleteMessage();
    ctx.answerCbQuery("I got It!");
    ctx.reply(`
Ask me any question. Don't forget to add a '?' mark at the end
(Example: How to use QnA Bot?)
`);
  });
  let stats = {
    totalQuestionAsked: 0,
    rating: {
      rater: 0,
      stars: 0,
    },
  };
  countapi.get(namespaceForCounter, "rater").then((res) => {
    stats.rating.rater = res.value;
  });
  countapi.get(namespaceForCounter, "stars").then((res) => {
    stats.rating.stars = res.value;
  });
  const rating = ["0", "1", "2", "3", "4", "5"];
  bot.action(rating, (ctx) => {
    const match = Number(ctx.match[0]);
    console.log(match, "mathc")
    ctx.deleteMessage()
    if (match) {
      countapi
        .update(namespaceForCounter, "stars", match)
        .then((res) => {
          stats.rating.stars = res.value;
          console.log("stars", res)
        })
        .catch((e) => {
          console.log(e);
        });
      countapi
        .hit(namespaceForCounter, "rater")
        .then((res) => {
          stats.rating.rater = res.value;
        })
        .catch((e) => {
          console.log(e);
        });
      ctx.answerCbQuery("Successfully rated");
      ctx.reply("Thanks for the Rating");
      ctx.reply(`
Total Ratings ${(stats.rating.stars / stats.rating.rater).toFixed(1)}⭐

Rated by ${stats.rating.rater}.
      `);
    } else {
      ctx.answerCbQuery();
      ctx.reply(`
Total Ratings ${(stats.rating.stars / stats.rating.rater).toFixed(1)}⭐

Rated by ${stats.rating.rater}.
      `);
    }
  });
};

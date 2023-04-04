// **************requirement section****************
const { Telegraf } = require("telegraf");
const countapi = require("countapi-js");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);
const {
  gptTemperature,
  gptMaxTokens,
  gptModel,
  namespaceForCounter,
} = require("./res/config");
const starter = require("./res/handler/start");
const actions = require("./res/handler/actions");
const commands = require("./res/handler/commands");
const bot = new Telegraf(process.env.BOT_TOKEN);
// countapi.create(namespaceForCounter, "totalAskedQuestion", 1).then((res) => {
//     console.log("res",res);
//   })
//
//
// varible section
let askedQuestion = 0;
//
//
// countapi.create({namespace : namespaceForCounter, key:"totalAskedQuestion", value: 0, update_upperbound : 100000}).then((res) => {
//     console.log("res",res);
//   }).catch(e => {
//     console.log("err",e)
//   })
//*************starter commands***************
starter(bot);

commands(bot);
actions(bot);
// **************Question*****************

bot.on("message", async (ctx) => {
  countapi.hit(namespaceForCounter, "totalAskedQuestion").then((res) => {
    console.log(res);
  });
  bot.telegram.sendChatAction(ctx.chat.id, "typing");
  let question = ctx.message.text;
  try {
    const res = await openai.createCompletion({
      model: gptModel,
      prompt: question,
      max_tokens: gptMaxTokens,
      temperature: gptTemperature,
    });
    ctx.reply(`${res.data.choices[0].text}`);
  } catch (e) {
    console.log(e);
  }
});

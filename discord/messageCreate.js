// node modules
const db = require("quick.db"),
  fetch = require("node-fetch"),
  msgpack = require("msgpack-lite");

// puppeteer

const { emitter } = require("../src/puppeteer/browser.js");

// functions

const removeBots = require("../src/functions/removeBots.js"),
  genRandom = require("../src/functions/bypass.js"),
  Projects = require("../src/functions/projects.js")(),
  collectStats = require("../src/functions/serverStats.js"),
  fetchIP = require("../src/functions/fetchIP.js"),
  fetchData = require("../src/functions/fetchData.js"),
  Generate = require("../src/functions/generate.js"),
  Connect = require("../src/functions/connect.js");

// strings

const succBotEmb = require("../src/strings/embeds/successBots.js"),
  succBotEmbEdit = require("../src/strings/embeds/successBotsEdit.js"),
  removBotsEmb = require("../src/strings/embeds/removeBots.js"),
  serverStatsEmv = require("../src/strings/embeds/serverStats.js"),
  getCommand = require("../src/strings/getCommand.js"),
  getTaken = require("../src/strings/taken.js"),
  getInfo = require("../src/strings/embeds/info.js");

const execommands = {
  ping: require("../src/bot/commands/ping.js"),
  fill: require("../src/bot/commands/fill.js"),
  genInvite: require("../src/bot/commands/genInvite.js"),
  verify: require("../src/bot/commands/verify.js"),
  info: require("../src/bot/commands/info.js"),
  token: require("../src/bot/commands/token.js"),
  stats: require("../src/bot/commands/stats.js")
};
let page, init;
emitter.once("open", (arg1, arg2) => {
  console.log("opened file.");
  page = arg1;
  init = arg2;
});
module.exports = async (client, message, serverData) => {
  if (message.channel.id == "924439985359323166")
    setTimeout(message.delete(), 4000);
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = getCommand(args);
  switch (command) {
    case "ping":
      execommands.ping(message);
      break;
    case "info":
      execommands.info(args, getInfo, message, fetchData);
      break;
    case "stats":
      execommands.stats(message, collectStats, serverStatsEmv);
      break;
    case "verify":
      execommands.verify(message, args);
      break;
    case "geninvite":
      execommands.genInvite(message, args, genRandom);
      break;
    case "token":
      execommands.token(message, init, Generate, page, getTaken);
      break;
    case "remove":
      message.channel.send(removBotsEmb());
      removeBots(Projects);
      break;
    case "fill":
      execommands.fill(
        message,
        args,
        succBotEmb,
        succBotEmbEdit,
        fetchIP,
        Projects
      );
      break;
  }
};

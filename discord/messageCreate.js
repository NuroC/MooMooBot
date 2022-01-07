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
  Connect = require("../src/functions/connect.js"),
  fetchServer = require("../src/functions/fetchServer.js");

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
  stats: require("../src/bot/commands/stats.js"),
  check: require("../src/bot/commands/check.js"),
  rall: require("../src/bot/commands/rall.js"),
  current: require("../src/bot/commands/current.js"),
  test: require("../src/bot/commands/test.js")
};
let page, init;
emitter.once("open", (arg1, arg2) => {
  console.log("opened file.");
  page = arg1;
  init = arg2;
});
module.exports = (async (e, t, c) => {
    const n = t.content.slice(e.config.prefix.length).trim().split(/ +/g);
    switch (getCommand(n)) {
      case "ping":
        execommands.ping(t);
        break;

      case "info":
        execommands.info(n, getInfo, t, fetchData);
        break;

      case "stats":
        execommands.stats(t, collectStats, serverStatsEmv);
        break;

      case "verify":
        execommands.verify(t, n);
        break;

      case "geninvite":
        execommands.genInvite(t, n, genRandom);
        break;

      case "token":
        execommands.token(t, init, Generate, page, getTaken);
        break;

      case "remove":
        removeBots(t, n, succBotEmb, succBotEmbEdit, fetchIP, Projects, fetchServer, removBotsEmb);
        break;

      case "check":
        execommands.check(n, t, Projects);
        break;

      case "current":
        execommands.current(n, t, Projects);
        break;

      case "removeall":
        execommands.rall(n, t, Projects);
        break;

      case "fill":
        execommands.fill(t, n, succBotEmb, succBotEmbEdit, fetchIP, Projects, fetchServer);
        break;

      case "test":
        execommands.test(t, n, succBotEmb, succBotEmbEdit, fetchIP, Projects, fetchServer);
        break;
    }
});


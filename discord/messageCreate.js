const db = require("quick.db"),
    fetch = require("node-fetch"),
    msgpack = require("msgpack-lite"),
    {
        emitter: emitter
    } = require("../src/puppeteer/browser.js"),
    removeBots = require("../src/functions/removeBots.js"),
    genRandom = require("../src/functions/bypass.js"),
    Projects = require("../src/functions/projects.js")(),
    collectStats = require("../src/functions/serverStats.js"),
    fetchIP = require("../src/functions/fetchIP.js"),
    fetchData = require("../src/functions/fetchData.js"),
    Generate = require("../src/functions/generate.js"),
    Connect = require("../src/functions/connect.js"),
    succBotEmb = require("../src/strings/embeds/successBots.js"),
    succBotEmbEdit = require("../src/strings/embeds/successBotsEdit.js"),
    removBotsEmb = require("../src/strings/embeds/removeBots.js"),
    serverStatsEmv = require("../src/strings/embeds/serverStats.js"),
    getCommand = require("../src/strings/getCommand.js"),
    getTaken = require("../src/strings/taken.js"),
    getInfo = require("../src/strings/embeds/info.js"),
    execommands = {
        ping: require("../src/bot/commands/ping.js"),
        fill: require("../src/bot/commands/fill.js"),
        genInvite: require("../src/bot/commands/genInvite.js"),
        verify: require("../src/bot/commands/verify.js"),
        info: require("../src/bot/commands/info.js"),
        token: require("../src/bot/commands/token.js"),
        stats: require("../src/bot/commands/stats.js")
    };

let page, init;

emitter.once("open", (e, s) => {
    console.log("opened file."), page = e, init = s;
}), module.exports = (async (e, s, r) => {
    "924439985359323166" == s.channel.id && setTimeout(s.delete(), 4e3);
    const t = s.content.slice(e.config.prefix.length).trim().split(/ +/g);
    switch (getCommand(t)) {
    case "ping":
        execommands.ping(s);
        break;

    case "info":
        execommands.info(t, getInfo, s, fetchData);
        break;

    case "stats":
        execommands.stats(s, collectStats, serverStatsEmv);
        break;

    case "verify":
        execommands.verify(s, t);
        break;

    case "geninvite":
        execommands.genInvite(s, t, genRandom);
        break;

    case "token":
        execommands.token(s, init, Generate, page, getTaken);
        break;

    case "remove":
        s.channel.send(removBotsEmb()), removeBots(Projects);
        break;

    case "fill":
        execommands.fill(s, t, succBotEmb, succBotEmbEdit, fetchIP, Projects);
    }
});

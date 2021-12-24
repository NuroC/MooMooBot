const Generate = require("../src/bot/generate.js");
const Connect = require("../src/bot/connect.js");
const getArgs = require("../src/strings/getArgs.js");
const getCommand = require("../src/strings/getCommand.js");
const fetchIP = require("../src/bot/fetchIP.js");
const { emitter } = require("../src/puppeteer/browser.js");
var page, init
emitter.once("open", (arg1, arg2) => {
  console.log("opened file.");
  page = arg1;
  init = arg2;
});
const msgpack = require("msgpack-lite");
module.exports = async (client, message) => {
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = getCommand(args);
  switch (command) {
    case "token":
      if (!init) return message.channel.send("Puppeeter isn't in the browser.");
      let token1 = await Generate(page);
      message.channel.send(token1);
      break;
    case "send":
      if (!init) return message.channel.send("Puppeeter isn't in the browser.");
      if (!args[0] || !args[0].includes(":"))
        return message.channel.send("Invalid server.");
      if (!args[1]) return message.channel.send("Invalid name.");
      let ip = await fetchIP(
        args[0].split(":")[0],
        args[0].split(":")[1].split(":")[0]
      );
      if (!ip) return message.channel.send("Invalid server.");
      args[1] && message.channel.send(`Connecting ${args[1]}`);
      Connect(
        false,
        message.channel,
        msgpack,
        `wss://ip_${ip}.moomoo.io:8008/?gameIndex=0&token=${await Generate(
          page
        )}`,
        args[1]
      );
      break;
  }
};


const Generate = require("../src/bot/generate.js");
const Connect = require("../src/bot/connect.js");
const getArgs = require("../src/strings/getArgs.js");
const getCommand = require("../src/strings/getCommand.js");
const fetch = require("node-fetch");
const fetchIP = require("../src/bot/fetchIP.js");
const fetchData = require("../src/bot/fetchData.js");
const { emitter } = require("../src/puppeteer/browser.js");
const removeBots = require("../src/functions/removeBots.js");
const getTaken = require("../src/strings/taken.js")
let Projects = require("../src/bot/projects.js");
Projects = Projects();
var page, init;
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
  switch (
    command
  ) {
    case "info":
      let afh = await fetchData(
        args[0].split(":")[0],
        args[0].split(":")[1].split(":")[0],
        args[1]
      );
      if(!afh) return message.channel.send('Invalid server.')
      message.channel.send({
        embeds: [
          {
            title: `${args[0]}`,
            description: `Just fetched server data, nothing special.`,
            author: {
              name: "Nuro & Wealthy"
            },
            fields: [
              {
                name: "ip",
                value: afh.ip
              },
              {
                name: "\u200b",
                value: "\u200b",
                inline: false
              },
              {
                name: "player count",
                value: afh.games[0].playerCount.toString(),
                inline: true
              },
              {
                name: "private",
                value: afh.games[0].isPrivate.toString(),
                inline: true
              },
              {
                name: "scheme",
                value: afh.scheme,
                inline: true
              }
            ]
          }
        ]
      });
      break;
    case "token":
      if (!init) return message.channel.send("Puppeeter isn't in the browser.");
      let start = Date.now();
      let token1 = await Generate(page);
      let taken = await getTaken(start)
      message.channel.send({
        embeds: [
          { title: `Execution took ${taken} seconds`, description: token1 }
        ]
      });
      break;
    case "remove":
      message.channel.send({
        embeds: [
          {
            title: `Removing Bots`,
            description:
              "Bots in the server will be removed as soon as possible."
          }
        ]
      });
      removeBots(Projects);
      break;
    case "fill":
      if (!args[0] || !args[0].includes(":"))
        return message.channel.send("Invalid server.");
      if (
        !args[1] ||
        !["normal", "norm", "sandbox", "sand", "dev"].includes(args[1])
      )
        return message.channel.send("Invalid server type.");
      args[1] = args[1].includes("norm")
        ? "normal"
        : args[1].includes("sand")
        ? "sandbox"
        : "dev";
      let ipv = await fetchIP(
        args[0].split(":")[0],
        args[0].split(":")[1].split(":")[0],
        args[1]
      );
      if (!ipv) return message.channel.send("Invalid server.");
      message.channel.send({
        embeds: [
          {
            title: `Connecting Bots`,
            description: `50 Bots will join ${args[1]} ${
              args[0]
            } as soon as possible.`
          }
        ]
      });
      for (let project in Projects) {
        fetch(
          `https://${Projects[project]}.glitch.me/sendbot?name=${
            ["Nuro", "Wealthy"][(Math.random() * 2) | 0]
          }&server=${args[0]}&type=${args[1]}&amount=4`
        );
      }

      break;
  }
};

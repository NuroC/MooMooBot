const Generate = require("../src/bot/generate.js");
const Connect = require("../src/bot/connect.js");
const getArgs = require("../src/strings/getArgs.js");
const getCommand = require("../src/strings/getCommand.js");
const fetch = require("node-fetch");
const fetchIP = require("../src/bot/fetchIP.js");
const fetchData = require("../src/bot/fetchData.js");
const { emitter } = require("../src/puppeteer/browser.js");
const removeBots = require("../src/functions/removeBots.js");
const getTaken = require("../src/strings/taken.js");
const collectStats = require("../src/bot/serverStats.js");
const genRandom = require("../src/functions/bypass.js");
let Projects = require("../src/bot/projects.js");
const db = require("quick.db");
const succBotEmb = require("../src/strings/embeds/successBots.js");
const succBotEmbEdit = require("../src/strings/embeds/successBotsEdit.js");
const removBotsEmb = require("../src/strings/embeds/removeBots.js");
Projects = Projects();
var page, init;
emitter.once("open", (arg1, arg2) => {
  console.log("opened file.");
  page = arg1;
  init = arg2; // hi
});
const msgpack = require("msgpack-lite");
module.exports = async (client, message, serverData) => {
  if (message.channel.id == "924439985359323166") {
    setTimeout(() => {
      message.delete();
    }, 4000);
  }
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = getCommand(args);
  switch (command) {
    case "info":
      serverData = await fetchData(
        args[0].split(":")[0],
        args[0].split(":")[1].split(":")[0],
        args[1]
      );
      if (!serverData) return message.channel.send("Invalid server.");
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
                value: serverData.ip
              },
              {
                name: "\u200b",
                value: "\u200b",
                inline: false
              },
              {
                name: "player count",
                value: serverData.games[0].playerCount.toString(),
                inline: true
              },
              {
                name: "private",
                value: serverData.games[0].isPrivate.toString(),
                inline: true
              },
              {
                name: "scheme",
                value: serverData.scheme,
                inline: true
              }
            ]
          }
        ]
      });
      break;
    case "stats":
      serverData = [
        await collectStats("sandbox"),
        await collectStats("normal"),
        await collectStats("dev")
      ];
      let displayer = [];
      debugger;
      for (let i in serverData) displayer[i] = serverData[i] ? serverData[i].toString() : 'failed';
      message.channel.send({
        embeds: [
          {
            title: `MooMoo.io status`,
            description: `Just fetched server data, nothing special.`,
            author: {
              name: "Nuro & Wealthy"
            },
            fields: [
              {
                name: "total",
                value: Number(
                  serverData[0] + serverData[1] + serverData[2]
                ).toString()
              },
              {
                name: "\u200b",
                value: "\u200b",
                inline: false
              },
              {
                name: "sandbox",
                value: displayer[0],
                inline: true
              },
              {
                name: "normal",
                value: displayer[1],
                inline: true
              },
              {
                name: "dev",
                value: displayer[2],
                inline: true
              }
            ]
          }
        ]
      });
      break;
    case "verify":
      if (!args[0])
        if (!message.channel.id == "924439985359323166") return message.reply("wrong channel");
      let tokens = db.get("storage.tokens");
      let usedtoken = false;
      let hd7a = false;
      for (let invite in tokens) {
        if (tokens[invite] == args[0]) {
          let usedtokenlist = db.get("storage.usedtokens");
          for (let i in usedtokenlist) {
            if (usedtokenlist[i] == args[0]) {
              usedtoken = true;
            }
          }
          hd7a = true;
          db.push("storage.usedtokens", args[0]);
        }
      }
      if (usedtoken) {
        message.reply("already used token");
      } else {
        if (hd7a) {
                
      let role = message.member.guild.roles.cache.find(
        role => role.id === "924397231740706877"
      );
      if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
        } else {
          message.reply("you entered a wrong invite.");
        }
      }


      break;
    case "geninvite":
      if (message.member.roles.cache.has("924444165226528858")) {
        let generatedToken = genRandom(20);
        message.author.send(generatedToken);
        db.push("storage.tokens", generatedToken);
        console.log(db.get("storage.tokens"));
      } else {
        message.reply("you cant use that.");
      }
      break;
    case "token":
      if (!init) return message.channel.send("Puppeeter isn't in the browser.");
      let start = Date.now();
      let token1 = await Generate(page);
      let taken = await getTaken(start);
      message.channel.send({
        embeds: [
          { title: `Execution took ${taken} seconds`, description: token1 }
        ]
      });
      break;
    case "remove":
      message.channel.send(removBotsEmb());
      removeBots(Projects);
      break;
    case "fill":
      if (message.member.roles.cache.has("924397464079982654")) {
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
        let msgid;
        message.channel.send(succBotEmb(args)).then(msg => {
          msgid = msg.id;
          console.log(msgid);
        });
        let sentProjects = 0;
        let failedProxies = 0;
        for (let project in Projects) {
          let response = await fetch(
            `https://${Projects[project]}.glitch.me/sendbot?name=${
              ["Nuro", "Wealthy"][(Math.random() * 2) | 0]
            }&server=${args[0]}&type=${args[1]}&amount=4`
          );
          let text = await response.text();
          if (text.split(" ")[0] == "Connecting") {
            sentProjects++;
          } else {
            failedProxies++;
          }
        }
        message.channel.messages
          .fetch({ around: msgid, limit: 1 })
          .then(msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit(succBotEmbEdit(sentProjects, failedProxies));
          });
      } else {
        message.reply("You cant use that.");
      }

      break;
  }
};

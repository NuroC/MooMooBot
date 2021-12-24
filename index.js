const fs = require('fs')
const Discord = require('discord.js')
const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});


const config = require("./config.json");

client.config = config;

const events = fs.readdirSync("./discord").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./discord/${file}`);
  client.on(eventName, event.bind(null, client));
}

client.login(config.token);

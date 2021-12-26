const db = require("quick.db");

function executeCommand(message, args, genRandom) {
  if (message.member.roles.cache.has("924444165226528858")) {
    let generatedToken = genRandom(20);
    message.author.send(generatedToken);
    db.push("storage.tokens", generatedToken);
  } else {
    message.reply("you cant use that.");
  }
}

module.exports = executeCommand;

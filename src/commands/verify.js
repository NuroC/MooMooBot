const db = require("quick.db");

function executeCommand(message, args) {
  if (!args[0])
    if (!message.channel.id == "924439985359323166")
      return message.reply("wrong channel");
  let tokens = db.get("storage.tokens");
  let usedtoken = false;
  for (let invite in tokens)
    if (tokens[invite] == args[0]) {
      let usedtokenlist = db.get("storage.usedtokens");
      for (let i in usedtokenlist)
        usedtokenlist[i] == args[0] && (usedtoken = true);
      usedtoken = true;
      db.push("storage.usedtokens", args[0]);
    }
  message.reply(
    usedtoken ? "already used token" : "you entered a wrong invite."
  );
}

module.exports = executeCommand;

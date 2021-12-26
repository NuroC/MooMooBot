const db = require("quick.db");

function executeCommand(e, t, o) {
    if (e.member.roles.cache.has("924444165226528858")) {
        let t = o(20);
        e.author.send(t), db.push("storage.tokens", t);
    } else e.reply("you cant use that.");
}

module.exports = executeCommand;

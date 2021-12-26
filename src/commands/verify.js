const db = require("quick.db");

function executeCommand(e, t) {
    if (!t[0] && "924439985359323166" == !e.channel.id) return e.reply("wrong channel");
    let n = db.get("storage.tokens"),
        o = !1;
    for (let e in n)
        if (n[e] == t[0]) {
            let e = db.get("storage.usedtokens");
            for (let n in e) e[n] == t[0] && (o = !0);
            o = !0, db.push("storage.usedtokens", t[0]);
        }
    e.reply(o ? "already used token" : "you entered a wrong invite.");
}

module.exports = executeCommand;

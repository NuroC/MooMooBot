async function executeCommand(e, n, r, t) {
    if (!e) return;
    if (!e[0]) return r.reply("wrong usage");
    if (!e[1]) return r.reply("wrong usage");
    const s = await t(e[0].split(":")[0], e[0].split(":")[1].split(":")[0], e[1]);
    if (!s) return r.channel.send("Invalid server.");
    r.channel.send(n(s, e));
}

module.exports = executeCommand;

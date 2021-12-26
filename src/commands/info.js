async function executeCommand(e, n, t, s) {
    if (!e) return;
    const a = await s(e[0].split(":")[0], e[0].split(":")[1].split(":")[0], e[1]);
    if (!a) return t.channel.send("Invalid server.");
    t.channel.send(n(a, e));
}

module.exports = executeCommand;

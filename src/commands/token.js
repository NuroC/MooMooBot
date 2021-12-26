async function executeCommand(e, n, t, o, s) {
    if (!n) return e.channel.send("Puppeeter isn't in the browser.");
    let c = Date.now(),
        i = await t(o);
    e.channel.send({
        embeds: [{
            title: `Execution took ${s(c)} seconds`,
            description: i
        }]
    });
}

module.exports = executeCommand;

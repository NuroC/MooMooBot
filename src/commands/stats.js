async function executeCommand(a, e, n) {
    var o = [await e("sandbox"), await e("normal"), await e("dev")];
    a.channel.send(n(o));
}

module.exports = executeCommand;

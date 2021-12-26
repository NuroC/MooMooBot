async function executeCommand(message, collectStats, serverStatsEmv) {
        var serverData = [
        await collectStats("sandbox"),
        await collectStats("normal"),
        await collectStats("dev")
      ];
      message.channel.send(serverStatsEmv(serverData));
}

module.exports = executeCommand

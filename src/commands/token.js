async function executeCommand(message, init, Generate, page, getTaken) {
        if (!init) return message.channel.send("Puppeeter isn't in the browser.");
      let StartDate = Date.now();
      let Result = await Generate(page);
      message.channel.send({
        embeds: [
          {
            title: `Execution took ${getTaken(StartDate)} seconds`,
            description: Result
          }
        ]
      });
}

module.exports = executeCommand

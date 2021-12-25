function succBots(args) {
  return {
    embeds: [
      {
        title: `Connecting Bots`,
        description: `50 Bots will join ${args[1]} ${
          args[0]
        } as soon as possible.`
      }
    ]
  };
}

module.exports = succBots;

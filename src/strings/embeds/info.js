function succBots(serverData, args) {
  return {
        embeds: [
          {
            title: `${args[0]}`,
            description: `Just fetched server data, nothing special.`,
            author: {
              name: "Nuro & Wealthy"
            },
            fields: [
              {
                name: "ip",
                value: serverData.ip
              },
              {
                name: "\u200b",
                value: "\u200b",
                inline: false
              },
              {
                name: "player count",
                value: serverData.games[0].playerCount.toString(),
                inline: true
              },
              {
                name: "private",
                value: serverData.games[0].isPrivate.toString(),
                inline: true
              },
              {
                name: "scheme",
                value: serverData.scheme,
                inline: true
              }
            ]
          }
        ]
      }
}

module.exports = succBots;

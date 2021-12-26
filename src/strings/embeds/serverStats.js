function succBots(serverData) {
  return {
        embeds: [
          {
            title: `Server Stats`,
            description: "fetching serverdata",
            fields: [
              {
                name: "total",
                value: (
                  serverData[1] +
                  serverData[0] +
                  serverData[2]
                ).toString()
              },
              {
                name: "sandbox",
                value: serverData[0].toString(),
                inline: true
              },
              {
                name: "normal",
                value: serverData[1].toString(),
                inline: true
              },
              {
                name: "dev",
                value: serverData[2].toString(),
                inline: true
              }
            ]
          }
        ]
      }
}

module.exports = succBots;

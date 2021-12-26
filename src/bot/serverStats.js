const fetch = require("node-fetch");

async function getData(serverData) {
  let players = 0;
  await fetch(`https://${serverData}.moomoo.io/serverData`)
    .then(e => e.text())
    .then(data => {
      let servers = JSON.parse(data);

      for (let i = 0; i < servers.servers.length; i++) {
        players = players + parseInt(servers.servers[i].games[0].playerCount);
      }
    });
  return players;
}

module.exports = getData;

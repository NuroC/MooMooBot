const fetch = require("node-fetch");

async function getData(serverData) {
  serverData = await fetch(
    `http://${
      serverData === "normal" ? "" : serverData + "."
    }moomoo.io/serverData.js`
  )
    .then(e => e.text())
    .then(data => {
      let servers = JSON.parse(data.split("= ")[1].split(";")[0]).servers;
      let players = 0;
      for (let i in servers) players += servers[i].games[0].playerCount;
      return players;

      return serverData;
    });
}

module.exports = getData;

// dont forget to pull request <3

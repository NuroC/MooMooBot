const fetch = require("node-fetch");

function removeBots(Projects) {
  for (let project in Projects)
    fetch(`https://${Projects[project]}.glitch.me/discbot?amount=4`);
}

module.exports = removeBots

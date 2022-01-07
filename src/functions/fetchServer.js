const fetch = require("node-fetch");
const fetchServer = async function(e, t, n) {
  n = n === "normal" ? "" : n + ".";
  n = await fetch(`http://${n}moomoo.io/serverData.js`)
    .then(e => e.text())
    .then(ea => {
      ea = JSON.parse(ea.split("= ")[1].split(";")[0]).servers.find(
        c => c.region.slice(6) == e && c.index == t
      );
      return ea;
    });
  return n;
};

module.exports = fetchServer;

const fetch = require('node-fetch')

const fetchIP = async function(e, t, n) {
  console.log(e,t,n)
  /* e: vultr, t: index}*/
  n = await fetch("http://moomoo.io/serverData.js")
    .then(e => e.text())
    .then(ea => {
      ea = JSON.parse(ea.split("= ")[1].split(";")[0]).servers.find(
        c => c.region.slice(6) == e && c.index == t
      );
      return ea ? ea.ip : undefined;
    });
  return n;
};

module.exports = fetchIP
function succBots(sentProjects, failedProxies) {
  return {
    embeds: [
      {
        title: `Connecting Bots`,
        description:
          "successfully activated " +
          sentProjects +
          " proxies, " +
          failedProxies +
          " failed to load."
      }
    ]
  };
}

module.exports = succBots;

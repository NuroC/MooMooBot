const fetch = require("node-fetch");
async function collectData(args, message, Projects) {
  let msgid;
  let allServers = [];
  message.channel
    .send({
      embeds: [
        {
          title: `Collecting data.`,
          description: `Data will be colected as soon as possible.`
        }
      ]
    })
    .then(msg => {
      msgid = msg.id;
    });
  for (let i in Projects) {
    let offline = false;
    if (!offline) {
      let resJson = JSON.parse(response);
      for (let bot of resJson) {
        if (!bot.close) {
          let alreadyDone = allServers.find(
            c => c.server == bot.server && c.type == bot.type
          );
          alreadyDone
            ? (alreadyDone.bots += 1)
            : allServers.push({ server: bot.server, type: bot.type, bots: 1 });
        }
      }
    }
  }
  console.log(allServers);
  let Message = ``;
  function addBlock(type, server, bots) {
    return `${type} ${server} | ${Math.min(bots, 50)}
    `;
  }
  if (allServers) {
    for (let i of allServers) Message += addBlock(i.type, i.server, i.bots);
  } else {
    Message = ``;
  }
  message.channel.messages.fetch({ around: msgid, limit: 1 }).then(msg => {
    const fetchedMsg = msg.first();
    fetchedMsg.edit({
      embeds: [
        {
          title: `Collected all the data successfully!`,
          description: Message
        }
      ]
    });
  });
}
module.exports = collectData;

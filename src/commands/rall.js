const fetch = require("node-fetch");
async function checkProxys(args, message, Projects) {
  let removedBots = 0;
  let msgid;
  message.channel
    .send({
      embeds: [
        {
          title: `Proxys are getting disconnected.`,
          description: `All the bots will be disconnected as soon as proxys respond.`
        }
      ]
    })
    .then(msg => {
      msgid = msg.id;
    });
  for (let i in Projects) {
    let offline = false;
    if (!offline) {
      console.log(response)
      removedBots += Number(response);
    }
  }
  message.channel.messages.fetch({ around: msgid, limit: 1 }).then(msg => {
    const fetchedMsg = msg.first();
    fetchedMsg.edit({
      embeds: [
        {
          title: removedBots ? `Removed ${removedBots} bots successfully.` : `Failed disconnecting proxys.`,
          description: removedBots ? `${Math.ceil(
            removedBots / 4
          )} Proxys [${removedBots} bots] got disconnected.` : `If you see this, probably there were no bots removed, which means there were no bots sent yet.`
        }
      ]
    });
  });
}
module.exports = checkProxys;

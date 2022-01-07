const fetch = require("node-fetch");
async function checkProxys(args, message, Projects) {
  let activeProxys = 0;
  let noTokenIn = 0;
  let msgid;
  message.channel
    .send({
      embeds: [
        {
          title: `Proxies are being checked.`,
          description: `Proxies will be checked as soon as possible.`
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
      if (response!= "true") noTokenIn += 1;
      activeProxys += 1;
    }
  }
  message.channel.messages.fetch({ around: msgid, limit: 1 }).then(msg => {
    const fetchedMsg = msg.first();
    fetchedMsg.edit({
      embeds: [
        {
          title: `Checked proxys successfully.`,
          description: `${activeProxys} Proxys are online.
                        ${activeProxys -
                          noTokenIn} Proxys are available to be used.`
        }
      ]
    });
  });
}
module.exports = checkProxys;

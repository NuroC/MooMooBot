const fetch = require("node-fetch");

async function executeCommand(
  message,
  args,
  succBotEmb,
  succBotEmbEdit,
  fetchIP,
  Projects
) {
  if (message.member.roles.cache.has("924397464079982654")) {
    if (!args[0] || !args[0].includes(":"))
      return message.channel.send("Invalid server.");
    if (
      !args[1] ||
      !["normal", "norm", "sandbox", "sand", "dev"].includes(args[1])
    )
      return message.channel.send("Invalid server type.");
    args[1] = args[1].includes("norm")
      ? "normal"
      : args[1].includes("sand")
      ? "sandbox"
      : "dev";
    let ipv = await fetchIP(
      args[0].split(":")[0],
      args[0].split(":")[1].split(":")[0],
      args[1]
    );
    if (!ipv) return message.channel.send("Invalid server.");
    let msgid;
    message.channel.send(succBotEmb(args)).then(msg => {
      msgid = msg.id;
    });
    let sentProjects = 0;
    let failedProxies = 0;
    for (let project in Projects) {
      let response = await fetch(
        `https://${Projects[project]}.glitch.me/sendbot?name=${
          ["Nuro", "Wealthy"][(Math.random() * 2) | 0]
        }&server=${args[0]}&type=${args[1]}&amount=4`
      );
      let text = await response.text();
      if (text.split(" ")[0] == "Connecting") {
        sentProjects++;
      } else {
        failedProxies++;
      }
    }
    message.channel.messages.fetch({ around: msgid, limit: 1 }).then(msg => {
      const fetchedMsg = msg.first();
      fetchedMsg.edit(succBotEmbEdit(sentProjects, failedProxies));
    });
  } else {
    message.reply("You cant use that.");
  }
}

module.exports = executeCommand;

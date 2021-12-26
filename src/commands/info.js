async function executeCommand(args, getInfo, message, fetchData){
  if(!args) return;
  const serverData = await fetchData(
        args[0].split(":")[0],
        args[0].split(":")[1].split(":")[0],
        args[1]
      );
      if (!serverData) return message.channel.send("Invalid server.");
      message.channel.send(getInfo(serverData, args));
}

module.exports = executeCommand;

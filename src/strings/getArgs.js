function getArgs(message, prefix) {
  return message.content.slice(prefix.length).trim().split(/ +/g);
}

module.exports = getArgs;
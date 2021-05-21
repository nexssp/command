// This file routes the dynamic path
// for example plugin dyn command b c where dyn is dynamic
// btw we already checked if the command exists

module.exports = (cmd, args, _, { through }) => {
  const cliArgs = require('minimist')(process.argv.slice(2))
  const commandsPath = ``
  const { config1 } = require('@nexssp/config')
  // We check if language is by extension
  let command
  ;[cmd, ...args] = process.argv.slice(2)
  try {
    command = require(`./commands/${cmd}`)
    // As the 4th argument we pass loaded language
    return command(cmd, args)
  } catch (e) {
    command = require(`./commands/command`)
    return command(cmd, args)
    try {
      // As the 4th argument we pass loaded language
    } catch (e) {}

    if (!through) {
      console.log(`Command ${cmd} not found.`)
    }
  }
}

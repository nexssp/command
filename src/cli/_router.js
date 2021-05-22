// This file routes the dynamic path
// for example plugin dyn command b c where dyn is dynamic
// btw we already checked if the command exists

module.exports = (cmd, args, _, { through }) => {
  const _debug = args.includes('--debug')
  args = args.filter((a) => a !== '--debug')
  const _log = require('@nexssp/logdebug')
  _log.dm('@router @command: cmd, args', cmd, args)
  let command
  try {
    _log.dc('@router @command: trying load command: ', `./commands/${cmd}`)
    command = require(`./commands/${cmd}`)
    // As the 4th argument we pass loaded language
    return command(cmd, args)
  } catch (e) {
    _log.dr(
      '@router @command: command not found: ',
      `./commands/${cmd}. Loading ./commands/command`
    )
    // default command one
    command = require(`./commands/command`)
    return command(cmd, args)
  }
}

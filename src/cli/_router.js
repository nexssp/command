// This file routes the dynamic path
// for example plugin dyn command b c where dyn is dynamic
// btw we already checked if the command exists

module.exports = (cmd, args, _, { through } = {}) => {
  const _debug = args.includes('--debug')
  args = args.filter((a) => a !== '--debug')
  const _log = require('@nexssp/logdebug')
  const _fs = require('fs')
  _log.dm('@router @command: cmd, args', cmd, args)
  let command
  const commandPath = `${__dirname}/commands/${cmd}.js`
  _log.dc('@router @command: trying load command: ', commandPath)
  if (_fs.existsSync(commandPath)) {
    require(commandPath)(cmd, args)
  } else {
    _log.dr(
      '@router @command: command not found: ',
      `./commands/${cmd}. Loading ./commands/command`
    )
    // default command one
    command = require(`./commands/command`)
    return command(cmd, args)
  }
}

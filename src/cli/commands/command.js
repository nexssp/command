module.exports = (cmd, args) => {
  const _log = require('@nexssp/logdebug')
  _log.dc('@command @command(execute)', { cmd, args })

  const cliArgs = require('../../config/args')
  const platform = cliArgs.platform || process.platform
  const { command1 } = require('../../config/command')

  command1.run(cmd, { platform })
}

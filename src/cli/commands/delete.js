module.exports = (cmd, args) => {
  const { cliArgs } = require('../../config/args')
  const platform = cliArgs.platform || 'all'

  const { command1 } = require('../../config/command')
  command1.deleteFromConfig(args[0], { platform, filter: ['--nxsPipeErrors'] })
}

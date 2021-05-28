module.exports = (_, args) => {
  const { green } = require('@nexssp/ansi')
  const { cliArgs } = require('../../config/args')
  const platform = cliArgs.platform || 'all'

  const { command1 } = require('../../config/command')
  command1.add(args[0], args.slice(1), { platform, filter: ['--nxsPipeErrors'] })
}

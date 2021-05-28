module.exports = (cmd, args) => {
  const _log = require('@nexssp/logdebug')
  const { bold, yellow, green } = require('@nexssp/ansi')
  const cliArgs = require('../../config/args')

  const os = require('@nexssp/os/legacy')

  const { command1 } = require('../../config/command')

  const platform = cliArgs.platform || process.platform
  _log.dc(`@command @list: platform: ${cliArgs.platform}`)

  const { config1 } = require('../../config/config')
  let commands = command1.list(platform)
  const configPath = config1.getPath()
  console.log('Config Path: ', configPath ? bold(configPath) : 'no config has been found.')
  const { isEmpty } = require('@nexssp/data')
  if (isEmpty(commands)) {
    _log.warn('No commands found')
  } else {
    Object.keys(commands).forEach((platform) => {
      console.log('PLATFORM: ', green(platform))
      console
      commands[platform].map((e) =>
        console.log(`${bold(e.name)} - ${yellow(bold(os.replacePMByDistro(e.command)))}`)
      )
    })
  }
}

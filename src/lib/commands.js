function listCommands() {
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH
  const { config1 } = require('../config/config')
  const configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH)
  const { green, bold, yellow } = require('@nexssp/ansi')
  const os = require('@nexssp/os/legacy')
  const commands = configContent.commands[process.platform]
    ? configContent.commands[process.platform]
    : configContent.commands

  if (!commands || (commands && commands.length == 0)) {
    console.log(bold(`No available commands for this package.`))
    process.exit(0)
  }
  console.log(bold(`Available predefined commands in _nexss.yml: (usage: nexss command *name*)`))
  const tags = os.tags('command-')

  const Table = require('cli-table3')
  const table = new Table({
    head: [green('name'), green('command')],
  })
  if (Array.isArray(commands))
    commands.forEach((cmd) => {
      let { command } = cmd
      const { name } = cmd
      if (cmd[tags[0]]) {
        command = cmd[tags[0]]
      } else if (cmd[tags[1]]) {
        command = cmd[tags[1]]
      }

      table.push([bold(yellow(name)), bold(os.replacePMByDistro(command))])
    })

  console.log(table.toString())
}

module.exports.listCommands = listCommands

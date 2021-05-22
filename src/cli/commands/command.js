module.exports = (cmd, args) => {
  const { green, bold, red, magenta, blue, yellow } = require('@nexssp/ansi')
  const _log = require('@nexssp/logdebug')
  _log.dc('@command @command(execute)', { cmd, args })
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH
  const { config1 } = require('../../config/config')
  const commandName = cmd
  _log.dc('@command @command: command name: ', commandName)
  const configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH)
  const { exec } = require('child_process')
  const { listCommands } = require('../../lib/commands')

  require('@nexssp/extend')('object')

  if (!configContent) {
    console.log(`You are not in the ${bold('Nexss Programmer')} project folder.`)
  }

  if (!configContent.commands) {
    _log.warn(`No commands have been found.`)
  } else if (commandName) {
    // Find command in the config by the name

    // We check if there is platform related code
    if (configContent.commands[process.platform]) {
      configContent.commands = configContent.commands[process.platform]
    }

    let CommandToRun = configContent.findByProp('commands', 'name', commandName)
    if (CommandToRun) {
      if (Array.isArray(CommandToRun)) {
        CommandToRun = CommandToRun[0]
      }

      const os = require('@nexssp/os')
      const tags = os.tags('command-')

      let commandFinal = CommandToRun.command
      if (process.platform !== 'win32') {
        if (CommandToRun[tags[0]]) {
          // For distributions we replace apt-get install/update/remove to the correct ones distributions eg. yum,zypper,dnf etc etc..
          // Users can write only apt-get install and everything else will be replaced..
          commandFinal = os.replacePMByDistro(CommandToRun[tags[0]])
        } else if (CommandToRun[tags[1]]) {
          commandFinal = os.replacePMByDistro(CommandToRun[tags[1]])
        } else {
          commandFinal = os.replacePMByDistro(CommandToRun.command)
        }
      }

      // Make sure

      // We get the first command for spawn
      // const commandArray = CommandToRun;
      // .command.split(" ");
      // let commandToRun = commandArray[0];
      // commandArray.shift();
      // Execute command and display in the stdio
      const sp = exec(commandFinal, {
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: process.shell,
      })

      sp.stdout.on('data', (data) => {
        process.stdout.write(data.toString())
      })

      let errorString = ''
      sp.stderr.on('data', (data) => {
        errorString += data.toString()
      })
      sp.stderr.on('end', () => {
        if (errorString) {
          if (errorString.indexOf('No repository field') > -1) {
            console.log(blue(`NOTE: Please put repository name in the package.json`))
          } else {
            console.error(red(bold('Error in commands:\n')))
            console.error(bold(magenta(errorString)))
            console.error(
              `Command ${CommandToRun.name} with issue: `,
              bold(blue(require('util').inspect(CommandToRun)))
            )
            console.error(`All commands available..`)
            console.error(bold(yellow(require('util').inspect(configContent.commands))))
          }
        }
      })
    } else {
      listCommands()
    }
  } else {
    listCommands()
  }
}

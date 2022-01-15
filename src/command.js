'use strict'

const { ddd, ddc } = require('@nexssp/dddebug')
const { nSpawn } = require('@nexssp/system')

/* eslint-disable space-before-function-paren, comma-dangle */
/**
 * Copyright © 2018-2022 Nexss.com / Marcin Polak mapoart@gmail.com. All rights reserved.
 * This source code is governed by MIT license, please check LICENSE file.
 */

/**
 * Creates functionality for Nexss Languages.
 * @constructor
 * @param {string} progress - It will show progress of the installations eg. git
 */

function nexssCommand({ config, progress, quiet } = {}) {
  let _fs
  let _path
  const _log = require('@nexssp/logdebug')

  const _progress = progress
  const { bold, red, yellow, green, magenta, blue } = require('@nexssp/ansi')

  let configContent = config.load()
  if (!configContent) {
    configContent = {}
  }

  if (!configContent.commands) {
    configContent.commands = {}
  }

  const start = () => {
    _fs = require('fs')
    _path = require('path')

    return true
  }

  function add(commandName, args, { filter, platform } = {}) {
    if (!platform) platform = process.platform
    if (Array.isArray(filter)) {
      filter = [filter]
    }

    const { isEmpty } = require('@nexssp/data')
    if (!isEmpty(filter)) {
      const { filterArray } = require('@nexssp/extend/array')
      args = filterArray(args, filter)
      args = args.filter(
        (a) =>
          !a.startsWith('-g') &&
          !a.startsWith('--global') &&
          !a.startsWith('--platform') &&
          !a.startsWith('--debug')
      )
    }

    const commandNamesBlocked = ['add', 'delete', 'list']
    if (commandNamesBlocked.includes(commandName)) {
      _log.error(
        `You cannot use command names: ${commandNamesBlocked.join(
          ', '
        )} as they are used by command itself.`
      )
      process.exit(1)
    }

    const commandToAdd = args.join(' ')

    if (!commandName) {
      _log.error('Please enter command name.')
      process.exit()
    }

    if (!commandToAdd) {
      _log.error('Please enter command body eg. nexss c add listFiles ls -la.')
      process.exit()
    }

    console.log(green(`Adding command '${commandName}' as '${commandToAdd}'`))

    addToConfig(commandName, commandToAdd, { platform })
  }

  function list(platform) {
    if (!platform) platform = process.platform

    let commands = configContent.commands

    if (platform === 'all') {
      if (commands.map) {
        return { legacy: commands }
      }
      return commands
    }

    if (commands[platform]) {
      commands = { [platform]: configContent.commands[platform] }
      if (configContent.commands.all) {
        commands.all = configContent.commands.all
      }
    } else if (!commands.map && commands['all']) {
      commands = { all: commands['all'] }
    } else {
      const { isEmpty } = require('@nexssp/data')
      commands = !isEmpty(configContent.commands) ? { legacy: configContent.commands } : []
    }

    return commands
  }

  function addToConfig(name, commandToAdd, { platform } = {}) {
    if (!platform) platform = process.platform
    if (existsInConfig(name, { platform, exact: true })) {
      let platformMessage = ''
      if (platform) {
        platformMessage += ` for the platform: ${platform}`
      }
      _log.warn(`Command '${name}' is already in the config ${config.getPath()}${platformMessage}`)

      return
    } else {
      if (!configContent.commands[platform]) {
        configContent.commands[platform] = []
      }

      configContent.commands[platform].push({ name, command: commandToAdd })

      config.save(configContent)
      if (!quiet) _log.success('Done..')
      return true
    }
  }

  function deleteFromConfig(name, { platform } = {}) {
    if (!platform) platform = process.platform
    if (!existsInConfig(name, { platform })) {
      let platformMessage = ''
      if (platform) {
        platformMessage += ` for the platform: ${platform}`
      }
      if (!quiet)
        _log.warn(`Command '${name}' does not exists in the ${config.getPath()}${platformMessage}`)
      return
    } else {
      const { deleteByProp } = require('@nexssp/extend/object')
      const deletedCommand = deleteByProp(configContent['commands'], platform, 'name', name)

      const { isEmpty } = require('@nexssp/data')
      if (isEmpty(configContent['commands'][platform])) {
        delete configContent['commands'][platform]
      }

      if (isEmpty(configContent['commands'])) {
        delete configContent['commands']
      }

      config.save(configContent)
      if (!quiet) _log.success('Done..', 'DELETED: ', deletedCommand)
      return true
    }
  }

  function get(name, { platform, distroTags } = {}) {
    if (!platform) platform = process.platform
    const CommandToRun = existsInConfig(name, { platform })

    if (!CommandToRun) {
      if (!quiet) {
        _log.warn(`Command '${name}' not found`)
        process.exit(1)
      }
      return
    }

    let commandFinal = CommandToRun.command
    if (process.platform !== 'win32') {
      const { os1 } = require('./config/os-config')
      const tags = distroTags || os1.getTags(null, null, 'command-')
      if (CommandToRun[`${tags[0]}`]) {
        // For distributions we replace apt-get install/update/remove to the correct ones distributions eg. yum,zypper,dnf etc etc..
        // Users can write only apt-get install and everything else will be replaced..
        commandFinal = os1.replacePMByDistro(CommandToRun[`${tags[0]}`])
      } else if (CommandToRun[`${tags[1]}`]) {
        commandFinal = os1.replacePMByDistro(CommandToRun[`${tags[1]}`])
      } else if (CommandToRun[`${tags[2]}`]) {
        commandFinal = os1.replacePMByDistro(CommandToRun[`${tags[2]}`])
      } else {
        commandFinal = os1.replacePMByDistro(CommandToRun.command)
      }
    }

    return commandFinal
  }

  function run(name, { platform, distroTags, cwd } = {}) {
    if (!platform) platform = process.platform
    const commandFinal = get(name, { platform, distroTags })

    if (!commandFinal) {
      throw new Error(`Command not found ${name} for platform: ${platform}`)
    }
    try {
      _log.info(
        `Run command ${bold(name)}: ${yellow(bold(commandFinal))}, cwd: ${cwd || process.cwd()}`
      )
      nSpawn(commandFinal, { stdio: 'inherit', cwd })
    } catch (e) {
      console.log(e)
    }

    // const { exec } = require('child_process')
    // const sp = exec(commandFinal, {
    //   stdio: ['inherit', 'pipe', 'pipe'],
    //   shell: process.shell,
    // })

    // sp.stdout.on('data', (data) => {
    //   process.stdout.write(data.toString())
    // })

    // let errorString = ''
    // sp.stderr.on('data', (data) => {
    //   errorString += data.toString()
    // })
    // sp.stderr.on('end', () => {
    //   if (errorString) {
    //     if (errorString.indexOf('No repository field') > -1) {
    //       console.log(blue(`NOTE: Please put repository name in the package.json`))
    //     } else {
    //       console.error(red(bold('Error in commands:\n')))
    //       console.error(bold(magenta(errorString)))
    //       console.error(
    //         `Command ${bold(red(name))} with issue: `,
    //         bold(blue(require('util').inspect(commandFinal)))
    //       )
    //       console.error(`All commands available..`)
    //       console.error(bold(yellow(require('util').inspect(configContent.commands))))
    //     }
    //   }
    // })
  }

  function existsInConfig(name, { platform, exact } = {}) {
    if (!platform) platform = process.platform
    const { findByProp } = require('@nexssp/extend/object')
    const currentCommands = list(platform)
    if (!currentCommands) return false
    if (findByProp(currentCommands, platform, 'name', name)) {
      return findByProp(currentCommands, platform, 'name', name)
    } else if (!exact && findByProp(currentCommands, 'all', 'name', name)) {
      return findByProp(currentCommands, 'all', 'name', name)
    } else {
      // console.log('Trying to load legacy commands')
      const configContentTemp = config.load()
      return (
        configContentTemp &&
        configContentTemp.commands &&
        findByProp(configContentTemp, 'commands', 'name', name)
      )
    }
  }

  const { applyTracker } = require('@nexssp/logdebug/tracker')
  return applyTracker({
    run,
    get,
    start,
    add,
    list,
    existsInConfig,
    deleteFromConfig,
  })
}

module.exports = nexssCommand

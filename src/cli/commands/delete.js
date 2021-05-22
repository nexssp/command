module.exports = (cmd, args) => {
  const { searchData } = require('../../lib/search')
  const { NEXSS_PROJECT_CONFIG_PATH } = require('../../config/config')
  const { config1 } = require('../../config/config')
  const configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH)

  const inquirer = require('inquirer')
  inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

  const commands = (e) => configContent.commands.map((f) => f.name)

  const questions = []
  questions.push({
    type: 'autocomplete',
    name: 'commandToDelete',
    source: searchData(commands),
    message: 'Select command to delete. Be careful as there is no confirmation!',
  })

  inquirer.prompt(questions).then((answers) => {
    const { NEXSS_PROJECT_CONFIG_PATH } = require('../../config/config')
    const configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH)
    require('@nexssp/extend')('object')
    configContent.deleteByProp('commands', 'name', answers.commandToDelete)
    config1.save(configContent, NEXSS_PROJECT_CONFIG_PATH)
    const _log = require('@nexssp/logdebug')
    _log.success('Done..')
  })
}

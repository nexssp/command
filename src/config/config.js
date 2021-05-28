const nexssConfig = require('@nexssp/config')
const { NEXSS_PROJECT_CONFIG_PATH, NEXSS_GLOBAL_CONFIG_PATH } = require('./paths')
const _log = require('@nexssp/logdebug')
const { cliArgs } = require('./args')
let configPath = NEXSS_PROJECT_CONFIG_PATH

if (cliArgs.global) {
  //validate filename
  const globalFilename = cliArgs.global
  const matchGroup = globalFilename.match(/(?<name>[a-zA-Z_0-9\-]*)\..{1,7}$/)
  if (!matchGroup.groups.name) {
    _log.error(`${cliArgs.global} is not valid filename. Use characters: a-zA-Z_0-9-`)
    process.exit(1)
  } else {
    _log.ok(`${matchGroup.groups.name} is valid filename.`)
  }

  configPath = `${NEXSS_GLOBAL_CONFIG_PATH}/${matchGroup.groups.name}.yml`
  _log.dg(`Global config path: ${configPath}`)
} else if (cliArgs.g) {
  configPath = `${NEXSS_GLOBAL_CONFIG_PATH}/_nexss_global.yml`
}
const config1 = nexssConfig({ type: 'yaml', configPath })
module.exports = { config1 }

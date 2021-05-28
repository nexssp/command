const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH
const { homedir } = require('os')
const NEXSS_GLOBAL_CONFIG_PATH = `${homedir}/.nexss`
module.exports = { NEXSS_PROJECT_CONFIG_PATH, NEXSS_GLOBAL_CONFIG_PATH }

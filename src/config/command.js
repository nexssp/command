const nexssCommand = require('../../')

const { config1 } = require('./config')
const command1 = nexssCommand({ config: config1 })

module.exports = { command1 }

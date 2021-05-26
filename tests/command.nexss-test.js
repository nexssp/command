const commandBinPath = require('path').resolve(__dirname, '../bin/nexssp-command.js')

module.exports = {
  nexsstests: [
    {
      type: 'shouldContain',
      params: [`node ${commandBinPath}`, /add.*command.*delete.*list.*/s],
    },
  ],
}

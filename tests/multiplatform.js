const commandBinPath = require('path').resolve(__dirname, '../bin/nexssp-command.js')

module.exports = {
  nexsstests: [
    {
      type: 'shouldContain',
      params: [
        `node ${commandBinPath} add init echo 'works!!!' --platform=win32`,
        /add.*command.*delete.*list.*/s,
      ],
    },
    {
      type: 'shouldContain',
      params: [
        `node ${commandBinPath} add mycommand echo 'my command works.'`,
        /Adding command 'mycommand'.*SUCCESS/s,
      ],
    },
    {
      type: 'shouldContain',
      params: [`node ${commandBinPath} mycommand`, /@nexssp\/command - v.*my command works\./s],
    },
    {
      type: 'shouldContain',
      params: [`node ${commandBinPath} list`, /@nexssp\/command - v.*my command works\./s],
    },
    // {
    //   type: 'shouldContain',
    //   params: [
    //     `node ${commandBinPath} delete mycommand`,
    //     /@nexssp\/command - v.*my command works\./s,
    //   ],
    // },
  ],
}

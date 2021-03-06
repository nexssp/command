const commandBinPath = require('path').resolve(__dirname, '../bin/nexssp-command.js')

module.exports = {
  nexsstests: [
    {
      type: 'shouldContain',
      params: [`node ${commandBinPath}`, /add.*command.*delete.*list.*/s],
    },
    {
      type: 'shouldContain',
      params: [`node ${commandBinPath} add mycommand "echo 'my command works.'"`, /.*SUCCESS/s],
    },
    {
      type: 'shouldContain',
      params: [
        `node ${commandBinPath} mycommand`,
        /@nexssp\/command - v.*my command works\./s,
        // { exitCode: 1 },
      ],
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

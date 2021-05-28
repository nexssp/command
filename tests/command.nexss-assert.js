// Below is the same as

const assert = require('assert')
const { nSpawn } = require('@nexssp/system')

process.chdir(__dirname)
const commandBinPath = require('path').resolve('../bin/nexssp-command.js')

// We create test dolder
// const { createNewTestFolder } = require('@nexssp/test')
// const testFolder = createNewTestFolder()
// console.log(`@test: ${testFolder}`)
// process.chdir(testFolder)
// Default help
// const result1 = nSpawn(`node ${commandBinPath}`)
// assert.match(result1.stdout, /add.*command.*delete.*list.*/s)
process.argv.push('--debug:diff')
const { command1 } = require('../src/config/command')
// console.log(command1.add('x', ['a', 'b', 'c'], { platform: 'win32' }))

// console.log(command1.list('linux'))

console.log(command1.existsInConfig('init', { platform: 'linux' }))

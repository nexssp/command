// Below is the same as

const assert = require('assert')
const { nSpawn } = require('@nexssp/system')

process.chdir(__dirname)
const commandBinPath = require('path').resolve('../bin/nexssp-command.js')

// We create test dolder
const { createNewTestFolder } = require('@nexssp/test')
const testFolder = createNewTestFolder()
console.log(`@test: ${testFolder}`)
process.chdir(testFolder)
// Default help
const result1 = nSpawn(`node ${commandBinPath}`)
assert.match(result1.stdout, /add.*command.*delete.*list.*/s)

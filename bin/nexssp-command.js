#!/usr/bin/env node
const plugin = require('@nexssp/plugin')
const pluginRoot = plugin({ path: `${__dirname}/..` })

pluginRoot.start()

const [, , cmd, ...args] = process.argv

pluginRoot.runCommand(cmd, args)

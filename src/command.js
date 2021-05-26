'use strict'
/* eslint-disable space-before-function-paren, comma-dangle */

/**
 * Copyright © 2018-2021 Nexss.com / Marcin Polak mapoart@gmail.com. All rights reserved.
 * This source code is governed by MIT license, please check LICENSE file.
 */

/**
 * Creates functionality for Nexss Languages.
 * @constructor
 * @param {string} progress - It will show progress of the installations eg. git
 */

function nexssCommand({ progress } = {}) {
  let _fs
  let _path
  let _log

  const _progress = progress
  const { bold, red, yellow, green } = require('@nexssp/ansi')

  const start = () => {
    _fs = require('fs')
    _path = require('path')
    _log = require('@nexssp/logdebug')

    return true
  }

  function exists(name) {
    //check if command exists
  }

  function run(name) {
    //run command
  }

  return {
    run,
    start,
  }
}

module.exports = nexssCommand

#!/usr/bin/env node
const mapArgs = require('../utils').mapArgs
var [,, ...args] = process.argv
const config = mapArgs(args)
new (require('../../index'))(config) // eslint-disable-line no-new

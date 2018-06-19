const fs = require('fs')
const utils = require('./utils')
const validateBody = require('./validate/validate-body')
const validateHeaders = require('./validate/validate-headers')
const validateStatusCode = require('./validate/validate-status-code')

class ApiFlipbooks {
  constructor (config) {
    // TBD
    let defaultConfig = {}
    // if no target passed, fail
    if (!config.target) {
      console.error('No target directory or file provided')
      process.exit(1)
    }
    // if target does not exist, fail
    if (!fs.existsSync(config.target)) {
      console.error(`ENOENT: path '${config.target}' not found`)
      process.exit(1)
    }
    // app logs
    this.logs = []
    // merge defaultConfig and config
    config = Object.assign(defaultConfig, config)
    this.init(config).catch((err) => { console.error(err) })
  }

  async init (config) {
    let flipbooks = await this.retrieveFlipbooks(config)
    await this.playFlipbooks(flipbooks)
  }

  async retrieveFlipbooks (config) {
    let flipbooks
    if (fs.lstatSync(config.target).isDirectory()) {
      flipbooks = await utils.matchAllFilesRecursively(config.target, /^.*flipbook\.js$/)
    }
    if (fs.lstatSync(config.target).isFile()) {
      flipbooks = [config.target]
    }
    return flipbooks
  }

  async playFlipbooks (flipbooks) {
    for (var i = 0; i < flipbooks.length; i++) {
      await this.playFlipbook(require(flipbooks[i]))
    }
  }

  async playFlipbook (flipbookConfig) {
    var flibookHistory = {}
    for (var i = 0; i < flipbookConfig.scenes.length; i++) {
      if (flipbookConfig.scenes[i].lifecicle.before) flipbookConfig.scenes[i] = await flipbookConfig.scenes[i].lifecicle.before(flibookHistory, flipbookConfig.scenes[i])
      var res = await utils.request(flipbookConfig.scenes[i].request).catch((e) => { console.error(e) })
      if (flipbookConfig.scenes[i].validation.statusCode) await validateStatusCode(flipbookConfig.scenes[i].validation.statusCode, res.code)
      if (flipbookConfig.scenes[i].validation.headerSchema) await validateHeaders(flipbookConfig.scenes[i].validation.headerSchema, res.headers)
      if (flipbookConfig.scenes[i].validation.bodySchema) await validateBody(flipbookConfig.scenes[i].validation.bodySchema, res.body)
      if (flipbookConfig.scenes[i].lifecicle.after) flibookHistory = await flipbookConfig.scenes[i].lifecicle.after(res.body, flibookHistory)
    }
  }
}

module.exports = ApiFlipbooks

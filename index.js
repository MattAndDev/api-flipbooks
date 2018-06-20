const fs = require('fs')
const utils = require('./lib/utils')
const validateBody = require('./lib/validate/validate-body')
const validateHeaders = require('./lib/validate/validate-headers')
const validateStatusCode = require('./lib/validate/validate-status-code')

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
    utils.logger('info', flipbookConfig.title)
    for (var i = 0; i < flipbookConfig.scenes.length; i++) {
      // shorten
      let scene = flipbookConfig.scenes[i]
      if (scene.describe) {
        utils.logger('info', scene.describe)
      }
      if (!scene.lifecycle) scene.lifecycle = {}
      if (scene.lifecycle.before) {
        scene = await scene.lifecycle.before(flibookHistory, scene)
      }
      var res = await utils.request(scene.request).catch((e) => { console.error(e) })
      if (scene.validation.statusCode) {
        await validateStatusCode(scene.validation.statusCode, res.code)
      }
      if (scene.validation.headerSchema) {
        await validateHeaders(scene.validation.headerSchema, res.headers)
      }
      if (scene.validation.bodySchema) {
        await validateBody(scene.validation.bodySchema, res.body)
      }
      if (scene.lifecycle.after) {
        flibookHistory = await scene.lifecycle.after(res.body, flibookHistory)
      }
    }
  }
}

module.exports = ApiFlipbooks

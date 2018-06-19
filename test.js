const ApiFlipbooks = require('./index.js')
class TestApiFlipBooks {
  constructor () {
    let config = {
      target: './flipbooks-examples'
    }
    new ApiFlipbooks(config) // eslint-disable-line no-new
  }
}

module.exports = new TestApiFlipBooks()

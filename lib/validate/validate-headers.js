const logger = require('../utils').logger

module.exports = async (expectedHeaders, headers) => {
  for (var header in expectedHeaders) {
    let validHeader = expectedHeaders[header] === headers[header]
    if (validHeader) {
      logger('success', `Passed header validation: '${header}': '${headers[header]}'`)
    }
    if (!validHeader) {
      logger('error', `Did not pass header validation: '${header}' : '${expectedHeaders[header]}'`)
    }
  }
}

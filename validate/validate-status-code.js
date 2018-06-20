const logger = require('../utils').logger

module.exports = async (expectedStatusCode, statusCode) => {
  let validResponseCode = expectedStatusCode === statusCode
  if (validResponseCode) {
    logger('success', `Valid response code: ${statusCode}`)
  }
  if (!validResponseCode) {
    logger('error', `Invalid response code: ${statusCode}, expected ${expectedStatusCode}`)
  }
}

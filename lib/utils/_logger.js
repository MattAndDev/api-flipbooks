/**
*  logger
*
*  @param {String} type - type of log
*  @param {Sring} message - message to log
*  @return {Function} console expression
*/
const logger = (type, message) => {
  if (type === 'error') {
    return console.error('\x1b[31m%s\x1b[0m', message)
  }
  if (type === 'success') {
    return console.log('\x1b[32m%s\x1b[0m', message)
  }
  if (type === 'info') {
    return console.log(message)
  }
  throw new Error(`Utils.logger does not support type: ${type}`)
}

module.exports = logger

const https = require('https')
const http = require('http')
const protocols = {http, https}
/**
*  utils.checkType
*  checks if a given value mathes the given type
*
*  @param {Object} options - 1 to one options for node https/http modules (options.protocol is used to pick core lib)
*  @param {String} body - Body of the request - optional
*  @return {Promise} resolves with response or rejects on error
*/
const request = ({options, body}) => {
  return new Promise((resolve, reject) => {
    var chunk = ''
    const req = protocols[options.protocol.replace(':', '')].request(options, (res) => {
      res.setEncoding('utf8')
      res.on('data', (resChunk) => {
        chunk += resChunk
      })
      res.on('end', () => { chunk
        var responseBody = chunk
        try {
          responseBody = JSON.parse(chunk)
        } catch (e) {}
        resolve({
          code: res.statusCode,
          headers: res.headers,
          body: responseBody
        })
      })
    })
    req.on('error', (e) => {
      reject(e)
    })
    if (body) req.write(body)
    req.end()
  })
}

module.exports = request

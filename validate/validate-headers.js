module.exports = async (expectedHeaders, headers) => {
  for (var header in expectedHeaders) {
    let validHeader = expectedHeaders[header] === headers[header]
    if (validHeader) {
      console.log(`Valid header: ${header}: ${headers[header]}`)
    }
    if (!validHeader) {
      console.error(`Invalid header code: ${headers[header]}, expected ${expectedHeaders[header]}`)
    }
  }
}

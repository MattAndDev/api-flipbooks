module.exports = async (expectedHeaders, headers) => {
  for (var header in expectedHeaders) {
    let validHeader = expectedHeaders[header] === headers[header]
    if (validHeader) {
      console.log(`Passed header validation: '${header}': '${headers[header]}'`)
    }
    if (!validHeader) {
      console.error(`Did not pass header validation: '${header}' : '${expectedHeaders[header]}'`)
    }
  }
}

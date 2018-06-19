module.exports = async (expectedStatusCode, statusCode) => {
  let validResponseCode = expectedStatusCode === statusCode
  if (validResponseCode) {
    console.log(`Valid response code: ${statusCode}`)
  }
  if (!validResponseCode) {
    console.error(`Invalid response code: ${statusCode}, expected ${expectedStatusCode}`)
  }
}

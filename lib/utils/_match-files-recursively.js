/**
*  matchAllFilesRecursively
*  given a root  path and regex returns all matching files
*
*  @param {String} baseDir - relative path to inspect for files
*  @param {regex} regex - a vali regular expression
*  @param {Array} results - for iteratee results
*  @param {Integer} iteration - index for iteratee
*  @param {String} cwd - current search path for iteratee
*  @return {Array} array of strings with the found files
*/

const fs = require('fs')
const matchAllFilesRecursively = async (baseDir, regex, results = [], iteration = 0, cwd = baseDir) => {
  let contents = await fs.readdirSync(cwd)
  for (var i = 0; i < contents.length; i++) {
    let currentPath = `${cwd}/${contents[i]}`
    let isFile = fs.statSync(currentPath).isFile()
    if (isFile && regex.test(currentPath)) {
      results.push(currentPath)
    }
    let isDir = fs.statSync(currentPath).isDirectory()
    if (isDir) {
      await matchAllFilesRecursively(baseDir, regex, results, iteration + 1, currentPath)
    }
  }
  return results
}

module.exports = matchAllFilesRecursively

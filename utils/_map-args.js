/**
*  mapArgs
*  given a raw process.argvs array returns a config object
*  NOTE: expected input: 'target'(optional) -rule value(optional)
*
*  @param {Array} args - process.argv (or alike) array
*  @return {Array} array of strings with the found files
*/
const mapArgs = (args) => {
  let mArgs = args.map((e, i, a) => {
    let opt = (e.indexOf('-') === 0) ? e.substring(1) : false
    if (!opt && i !== 0) return null
    if (!opt && i === 0) return { target: e }
    let hasValue = a[i + 1] && a[i + 1].indexOf('-') !== 0
    let res = (hasValue) ? { [opt]: a[i + 1] } : {[opt]: true}
    return res
  })
  return Object.assign({}, ...mArgs.filter(a => a))
}

module.exports = mapArgs

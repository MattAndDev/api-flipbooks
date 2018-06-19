/**
*  checkType
*  checks if a given value mathes the given type
*
*  @param {Mixed} value - the value to be cheked against
*  @param {('object'|'array'|'boolean'|'integer'|'float'|'string')} type - expected value type
*  @return {Booolean|Null} true if value matches type, false if not, null if type is not supported
*/
const checkType = async (value, type) => {
  let supported = /^(object|array|boolean|integer|float|string)$/
  if (!supported.test(type)) return null
  if (type === 'string') return typeof value === typeof 'string'
  if (type === 'boolean') return typeof value === typeof false
  if (type === 'array') return Array.isArray(value)
  if (type === 'object') return (typeof value === typeof {} && value instanceof Array === false)
  if (type === 'integer') return Number.isInteger(value)
  if (type === 'float') return typeof value === 'number' && !Number.isInteger(value)
}

module.exports = checkType

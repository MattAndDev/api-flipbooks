const utils = require('../utils')

module.exports = async (schema, obj) => {
  await objectKeysIterator(schema, obj)
  return true
}

let objectKeysIterator = async (schema, obj, parentKeys = false) => {
  // each first level
  for (var property in schema) {
    let displayKey = (parentKeys) ? `${parentKeys}.${property}` : `${property}`
    if (!obj.hasOwnProperty(property)) {
      utils.logger('error', `Property ${displayKey} could not be found in response.`)
      continue
    }
    let isCorrectType = await utils.checkType(obj[property], schema[property]._type)
    if (!isCorrectType) {
      utils.logger('error', `Property ${displayKey} didn't pass type validation.\nExpected: ${schema[property]._type}\nReceived: ${obj[property]}`)
    }
    if (isCorrectType === true) {
      utils.logger('success', `Property ${displayKey} passed type validation.`)
    }
    let should = null
    if (schema[property].should && isCorrectType) should = await schema[property].should(obj[property])
    if (should === false) {
      utils.logger('error', `Property ${displayKey} didn't pass should validation.\nShould: ${schema[property].should.toString()}\nActual value: ${obj[property]}`)
    }
    if (should && schema[property].should) {
      utils.logger('success', `Property ${displayKey} passed should validation.\nShould: ${schema[property].should.toString()}`)
    }
    if (schema[property]._keys && isCorrectType && schema[property]._type === 'object') {
      await objectKeysIterator(schema[property]._keys, obj[property], displayKey)
    }
    if (schema[property]._sample && isCorrectType && schema[property]._type === 'array') {
      if (!obj[property][schema[property]._sample.index]) {
        utils.logger('error', `Sampled array ${property} has no index ${schema[property]._sample.index}`)
        continue
      }
      await objectKeysIterator(schema[property]._sample._keys, obj[property][schema[property]._sample.index], displayKey + `[${schema[property]._sample.index}]`)
    }
  }
  return true
}

const Antl = use('Antl')
const Validator = use('Validator')
const _ = require('lodash')
const ValidationException = use('App/Exceptions/ValidationException')

module.exports = async (data, rules, messages = {}, attributes = {}) => {
  messages = Object.assign({}, Antl.forLocale('ru').list('validation'), messages)
  attributes = Object.assign({}, Antl.forLocale('ru').list('attributes'), attributes)
  messages = _.mapValues(messages, message => {
    return (field, validation, args) => {
      return message
        .replace('{{field}}', _.get(attributes, field, _.upperFirst(field)))
        .replace('{{argument.0}}', _.get(attributes, args[0], args[0]))
        .replace('{{argument.1}}', _.get(attributes, args[1], args[1]))
    }
  })
  const validation = await Validator.validateAll(data, rules, messages)
  if (validation.fails()) {
    throw new ValidationException(validation.messages(), 422)
  }
  return true
}

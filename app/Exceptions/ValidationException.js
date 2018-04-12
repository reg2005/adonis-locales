'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {
  /**
   * Handle this exception by itself
   */
}

module.exports = ValidationException

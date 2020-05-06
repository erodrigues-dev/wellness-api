const { BaseError } = require('sequelize')

function getErrorMessage(error) {
  let message = 'Has ocurred an error'

  if (
    error instanceof BaseError &&
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    message = error.errors[0].message
  }

  return message
}

module.exports = getErrorMessage

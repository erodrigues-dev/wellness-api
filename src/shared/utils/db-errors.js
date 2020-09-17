const { DatabaseError, UniqueConstraintError } = require('sequelize');

function getErrorMessage(error) {
  if (error instanceof DatabaseError) {
    return error.message;
  }

  if (error instanceof UniqueConstraintError) {
    return error.errors[0].message;
  }

  return 'Has ocurred an error';
}

module.exports = getErrorMessage;

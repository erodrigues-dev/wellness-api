const bcrypt = require('bcrypt')

module.exports = {
  hash(password) {
    return bcrypt.hash(password, 8)
  },

  compare(password, hash) {
    return bcrypt.compare(password, hash)
  }
}

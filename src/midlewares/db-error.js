const { BaseError } = require('sequelize')
const getErrorMessage = require('../shared/utils/db-errors')

module.exports = app => {
  app.use((err, req, res, next) => {
    console.log('>>>>>> midleware db-error')
    if (err instanceof BaseError) {
      const message = getErrorMessage(err)
      return res.status(400).json({ message })
    }

    next(err)
  })
}

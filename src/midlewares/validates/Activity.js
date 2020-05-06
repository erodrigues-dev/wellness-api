const { celebrate, Joi, Segments } = require('celebrate')

module.exports = app => {
  app.post(
    '/activities',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        duration: Joi.number().integer().required()
      })
    })
  )
}

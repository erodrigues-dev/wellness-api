const { celebrate, Joi, Segments } = require('celebrate')

module.exports = app => {
  app.get(
    '/users',
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().allow('').optional(),
        email: Joi.string().allow('').optional(),
        page: Joi.number(),
        rows: Joi.number()
      })
    })
  )

  app.get(
    '/users/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    })
  )

  app.post(
    '/users',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3).max(8)
      })
    })
  )

  app.put(
    '/users',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(3).max(8).optional()
      })
    })
  )
}

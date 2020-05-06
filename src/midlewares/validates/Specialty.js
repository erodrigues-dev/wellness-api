const { celebrate, Joi, Segments } = require('celebrate')

module.exports = app => {
  app.get(
    '/specialties',
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().allow('').optional(),
        page: Joi.number(),
        rows: Joi.number()
      })
    })
  )

  app.get(
    '/specialties/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    })
  )

  app.post(
    '/specialties',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
      })
    })
  )

  app.put(
    '/specialties',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required()
      })
    })
  )
}

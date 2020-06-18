const { celebrate, Joi, Segments } = require('celebrate')

module.exports = app => {
  app.get(
    '/employees',
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().allow('').optional(),
        email: Joi.string().allow('').optional(),
        profile: Joi.string().allow('').optional(),
        specialty: Joi.string().allow('').optional(),
        page: Joi.number(),
        limit: Joi.number()
      })
    })
  )

  app.get(
    '/employees/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    })
  )

  app.post(
    '/employees',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(20),
        specialty: Joi.string().max(100).optional().allow(''),
        profileId: Joi.number().required()
      })
    })
  )

  app.put(
    '/employees',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).optional().allow(''),
        specialty: Joi.string().max(100).optional().allow(''),
        profileId: Joi.number().required()
      })
    })
  )
}

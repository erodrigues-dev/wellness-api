const { celebrate, Joi, Segments } = require('celebrate')

module.exports = app => {
  app.get(
    '/profiles',
    celebrate({
      [Segments.QUERY]: Joi.object({
        name: Joi.string().allow('').optional(),
        description: Joi.string().allow('').optional(),
        page: Joi.number().min(1),
        rows: Joi.number().min(1)
      })
    })
  )

  app.get(
    '/profiles/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.number().required()
      })
    })
  )

  app.post(
    '/profiles',
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        functionalities: Joi.array()
          .items({
            name: Joi.string().required(),
            actions: Joi.number().required()
          })
          .min(1)
          .required()
      })
    })
  )

  app.put(
    '/profiles',
    celebrate({
      [Segments.BODY]: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        functionalities: Joi.array()
          .items({
            name: Joi.string().required(),
            actions: Joi.number().required()
          })
          .min(1)
          .required()
      })
    })
  )

  app.delete(
    '/profiles/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.number().required()
      })
    })
  )
}

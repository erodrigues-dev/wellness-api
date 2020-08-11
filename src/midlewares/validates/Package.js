const { celebrate, Joi, Segments } = require('celebrate')

const parseActivities = (req, res, next) => {
  req.body.activities = (req.body.activities || []).map(json =>
    JSON.parse(json)
  )
  next()
}

module.exports = app => {
  app.get(
    '/packages',
    celebrate({
      [Segments.QUERY]: Joi.object({
        name: Joi.string().allow('').optional(),
        activityName: Joi.string().allow('').optional(),
        page: Joi.number().min(1),
        limit: Joi.number().min(1).optional()
      })
    })
  )

  app.get(
    '/packages/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.number().required()
      })
    })
  )

  app.post(
    '/packages',
    parseActivities,
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0.01).positive().required(),
        description: Joi.string().required(),
        expiration: Joi.date().required(),
        showInApp: Joi.boolean(),
        showInWeb: Joi.boolean(),
        activities: Joi.array()
          .items({
            id: Joi.number().required(),
            quantity: Joi.number().integer().positive().required()
          })
          .required()
      })
    })
  )

  app.put(
    '/packages',
    parseActivities,
    celebrate({
      [Segments.BODY]: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        price: Joi.number().min(0.01).positive().required(),
        description: Joi.string().required(),
        activities: Joi.array()
          .items({
            id: Joi.number().required(),
            quantity: Joi.number().integer().positive().required()
          })
          .required()
      })
    })
  )

  app.delete(
    '/packages/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.number().required()
      })
    })
  )
}

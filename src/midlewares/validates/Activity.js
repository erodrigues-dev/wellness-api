const { celebrate, Joi, Segments } = require('celebrate')

module.exports = app => {
  app.get(
    '/activities',
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().allow('').optional(),
        employeeId: Joi.string().allow('').optional(),
        page: Joi.number().min(1).optional(),
        limit: Joi.number().min(1).optional()
      })
    })
  )

  app.get(
    '/activities/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.number().required()
      })
    })
  )

  app.post(
    '/activities',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        duration: Joi.number().integer().required(),
        employeeId: Joi.number().integer().required()
      })
    })
  )

  app.put(
    '/activities',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.number().min(1).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        duration: Joi.number().integer().required(),
        employeeId: Joi.number().integer().required()
      })
    })
  )
}

import { celebrate, Joi, Segments } from 'celebrate'
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()

const parseActivities = (req: Request, res: Response, next: NextFunction) => {
  req.body.activities = (req.body.activities || []).map(json =>
    JSON.parse(json)
  )
  next()
}

const getCurrentDate = () => {
  const date = new Date()

  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

router.get(
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

router.get(
  '/packages/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  })
)

router.post(
  '/packages',
  parseActivities,
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().min(0.01).positive().required(),
      description: Joi.string().required(),
      expiration: Joi.date().min(getCurrentDate()).allow(null).default(null),
      showInrouter: Joi.boolean().default(true),
      showInWeb: Joi.boolean().default(true),
      activities: Joi.array()
        .items({
          id: Joi.number().required(),
          quantity: Joi.number().integer().positive().required()
        })
        .required()
    })
  })
)

router.put(
  '/packages',
  parseActivities,
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().min(0.01).positive().required(),
      description: Joi.string().required(),
      expiration: Joi.date().min(getCurrentDate()).allow(null).default(null),
      showInrouter: Joi.boolean().default(true),
      showInWeb: Joi.boolean().default(true),
      activities: Joi.array()
        .items({
          id: Joi.number().required(),
          quantity: Joi.number().integer().positive().required()
        })
        .required()
    })
  })
)

router.delete(
  '/packages/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  })
)

export default router

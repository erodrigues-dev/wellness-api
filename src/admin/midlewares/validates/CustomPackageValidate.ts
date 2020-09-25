import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();
const routerName = '/customers/:customerId/custom-packages';

const getCurrentDate = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};

router.get(
  routerName,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      customerId: Joi.number().required()
    }),
    [Segments.QUERY]: Joi.object({
      name: Joi.string().allow('').optional(),
      activityName: Joi.string().allow('').optional(),
      page: Joi.number().min(1),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.get(
  `${routerName}/:id`,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
      customerId: Joi.number().required()
    })
  })
);

router.post(
  routerName,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      customerId: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().min(0.01).positive().required(),
      description: Joi.string().required(),
      expiration: Joi.date().min(getCurrentDate()).allow(null).default(null),
      activities: Joi.array()
        .items({
          id: Joi.number().required(),
          quantity: Joi.number().integer().positive().required()
        })
        .required()
    })
  })
);

router.put(
  routerName,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      customerId: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().min(0.01).positive().required(),
      description: Joi.string().required(),
      expiration: Joi.date().min(getCurrentDate()).allow(null).default(null),
      activities: Joi.array()
        .items({
          id: Joi.number().required(),
          quantity: Joi.number().integer().positive().required()
        })
        .required()
    })
  })
);

router.delete(
  `${routerName}/:id`,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
      customerId: Joi.number().required()
    })
  })
);

export default router;

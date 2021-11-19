import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/discounts',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      customerId: Joi.number().allow('').optional(),
      relationName: Joi.string().allow('').optional(),
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.get(
  '/discounts/find/:customerId/:relationType/:relationId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      customerId: Joi.number().required(),
      relationType: Joi.string().valid('package', 'activity').required(),
      relationId: Joi.number().required()
    })
  })
);

router.get(
  '/discounts/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/discounts',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().required(),
      type: Joi.string().valid('percent', 'amount').required(),
      value: Joi.number()
        .positive()
        .required()
        .when('type', {
          is: 'percent',
          then: Joi.number().integer().max(100)
        }),
      relationType: Joi.string().valid('package', 'activity').required(),
      relationId: Joi.number().required()
    })
  })
);

router.put(
  '/discounts',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
      customerId: Joi.number().required(),
      type: Joi.string().valid('percent', 'amount').required(),
      value: Joi.number().positive().required().when('type', {
        is: 'percent',
        then: Joi.number().integer()
      }),
      relationType: Joi.string().valid('package', 'activity').required(),
      relationId: Joi.number().required()
    })
  })
);

router.delete(
  '/discounts/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
);

export default router;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.get(
  '/discounts',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      customerId: Joi.number().allow('').optional(),
      relationName: Joi.string().allow('').optional(),
      page: Joi.number(),
      limit: Joi.number()
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
      value: Joi.number().positive().required().when('type', {
        is: 'percent',
        then: Joi.number().integer()
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

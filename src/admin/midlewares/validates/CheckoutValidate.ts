import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.post(
  '/checkout/calculate-discount',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().required(),
      itemType: Joi.string().valid('package', 'activity').required(),
      itemId: Joi.number().required()
    })
  })
);

router.post(
  '/checkout/pay-with-money',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().required(),
      itemType: Joi.string().valid('package', 'activity').required(),
      itemId: Joi.number().required(),
      quantity: Joi.number().positive().required()
    })
  })
);

router.post(
  '/checkout/pay-with-card',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().required(),
      itemType: Joi.string().valid('package', 'activity').required(),
      itemId: Joi.number().required(),
      quantity: Joi.number().positive().required(),
      cardId: Joi.string().required(),
      tip: Joi.number().positive().optional().allow(''),
      dueDate: Joi.date().optional().allow(null),
      saveCard: Joi.boolean().default(false)
    })
  })
);

export default router;

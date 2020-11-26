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
      cardName: Joi.when('saveCard', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow('')
      }),
      tip: Joi.number().positive().optional().allow('', null, 0).default(0),
      dueDate: Joi.date().optional().allow(null),
      saveCard: Joi.boolean().default(false)
    })
  })
);

export default router;

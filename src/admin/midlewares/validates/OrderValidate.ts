import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.post(
  '/orders/pay-with-money',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().required(),
      itemType: Joi.string().valid('package', 'activity').required(),
      itemId: Joi.number().required(),
      quantity: Joi.number().positive().required()
    })
  })
);

export default router;

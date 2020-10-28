import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.post(
  '/orders/pay-with-money',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().required(),
      itemType: Joi.string().valid('package', 'activity').required(),
      itemId: Joi.number().required()
    })
  })
);

export default router;

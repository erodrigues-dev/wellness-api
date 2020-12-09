import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/orders',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      customerId: Joi.number().optional().allow(''),
      page: Joi.number().positive().optional().default(1),
      limit: Joi.number().positive().optional().default(10)
    })
  })
);

export default router;

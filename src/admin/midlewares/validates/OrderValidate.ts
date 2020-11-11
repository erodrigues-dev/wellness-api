import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { join } from 'path';

const router = Router();

router.get(
  '/orders',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      customerId: Joi.number().optional(),
      page: Joi.number().positive().optional().default(1),
      limit: Joi.number().positive().optional().default(10)
    })
  })
);

export default router;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.get(
  '/customers',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow('').optional(),
      email: Joi.string().allow('').optional(),
      page: Joi.number(),
      limit: Joi.number()
    })
  })
);

router.get(
  '/customers/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/customers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(20)
    })
  })
);

router.put(
  '/customers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).max(20).optional().allow('')
    })
  })
);

export default router;

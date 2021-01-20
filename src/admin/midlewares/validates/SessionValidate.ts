import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8)
    })
  })
);

router.post(
  '/sessions/recover-password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required()
    })
  })
);

router.put(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      specialty: Joi.string().max(100).optional().allow(null, ''),
      password: Joi.string().optional().allow(null)
    })
  })
);

export default router;

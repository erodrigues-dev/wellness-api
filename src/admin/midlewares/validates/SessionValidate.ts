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

router.post(
  '/sessions/send-confirmation',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
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
      confirmationCode: Joi.string().allow(null, ''),
      specialty: Joi.string().max(100).allow(null, ''),
      password: Joi.string().allow(null, '')
    })
  })
);

export default router;

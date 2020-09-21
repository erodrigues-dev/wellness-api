import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

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

export default router;

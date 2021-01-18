import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.get(
  '/employees',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow('').optional(),
      email: Joi.string().allow('').optional(),
      profile: Joi.string().allow('').optional(),
      specialty: Joi.string().allow('').optional(),
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.get(
  '/employees/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/employees',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(20),
      specialty: Joi.string().max(100).optional().allow(''),
      profileId: Joi.number().required()
    })
  })
);

router.put(
  '/employees',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).max(20).optional().allow(''),
      specialty: Joi.string().max(100).optional().allow(''),
      profileId: Joi.number().required()
    })
  })
);

export default router;

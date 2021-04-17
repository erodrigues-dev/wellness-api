import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/employees',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow(''),
      email: Joi.string().allow(''),
      profile: Joi.string().allow(''),
      specialty: Joi.string().allow(''),
      page: Joi.number().min(1),
      limit: Joi.number().min(1)
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
      phone: Joi.string().allow(null, '').max(20),
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
      phone: Joi.string().allow(null, '').max(20),
      specialty: Joi.string().max(100).optional().allow(''),
      profileId: Joi.number().required()
    })
  })
);

export default router;

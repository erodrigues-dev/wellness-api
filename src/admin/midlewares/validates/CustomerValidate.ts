import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/customers',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow(''),
      email: Joi.string().allow(''),
      page: Joi.number().min(1),
      limit: Joi.number().min(1)
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
      phone: Joi.string().allow(null, ''),
      privateNotes: Joi.string().allow(null, ''),
      publicNotes: Joi.string().allow(null, '')
    })
  })
);

router.put(
  '/customers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      phone: Joi.string().allow(null, ''),
      privateNotes: Joi.string().allow(null, ''),
      publicNotes: Joi.string().allow(null, '')
    })
  })
);

export default router;

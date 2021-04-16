import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.get(
  '/specialties',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow('', null),
      page: Joi.number().min(1),
      limit: Joi.number().min(1)
    })
  })
);

router.get(
  '/specialties/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/specialties',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required()
    })
  })
);

router.put(
  '/specialties',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required()
    })
  })
);

router.delete(
  '/specialties/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
);

export default router;

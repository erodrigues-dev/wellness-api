import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.get(
  '/categories',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow('').optional(),
      type: Joi.string().allow('').optional(),
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.get(
  '/categories/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/categories',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.string().required()
    })
  })
);

router.put(
  '/categories',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().min(1).required(),
      name: Joi.string().required()
    })
  })
);

export default router;

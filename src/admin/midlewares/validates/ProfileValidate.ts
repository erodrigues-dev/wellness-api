import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/profiles',
  celebrate({
    [Segments.QUERY]: Joi.object({
      name: Joi.string().allow('').optional(),
      description: Joi.string().allow('').optional(),
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.get(
  '/profiles/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/profiles',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      permissions: Joi.number().positive().required()
    })
  })
);

router.put(
  '/profiles',
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      permissions: Joi.number().positive().required()
    })
  })
);

export default router;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router.get(
  '/activities',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().allow('').optional(),
      employeeId: Joi.string().allow('').optional(),
      categoryId: Joi.string().allow('').optional(),
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.get(
  '/activities/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  })
);

router.post(
  '/activities',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      duration: Joi.number().integer().required(),
      categoryId: Joi.number().integer().required(),
      employeeId: Joi.number().allow('', null),
      showInApp: Joi.boolean().default(true),
      showInWeb: Joi.boolean().default(true),
      maxPeople: Joi.number().integer().positive().optional()
    })
  })
);

router.put(
  '/activities',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().min(1).required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      duration: Joi.number().integer().required(),
      employeeId: Joi.number().allow('', null),
      categoryId: Joi.number().integer().required(),
      showInApp: Joi.boolean().default(true),
      showInWeb: Joi.boolean().default(true),
      maxPeople: Joi.number().integer().positive().optional()
    })
  })
);

export default router;

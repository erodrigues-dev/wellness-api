import { celebrate, CelebrateError, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/schedules',
  celebrate({
    [Segments.QUERY]: Joi.object({
      customerId: Joi.number().optional(),
      activityId: Joi.number().optional(),
      dateStart: Joi.string().isoDate().optional().options({ convert: false }),
      dateEnd: Joi.string().isoDate().optional().options({ convert: false }),
      status: Joi.string().optional(),
      page: Joi.number().default(1).optional(),
      limit: Joi.number().default(10).optional()
    })
  })
);

router.post(
  '/schedules',
  celebrate({
    [Segments.BODY]: Joi.object({
      customerId: Joi.number().required(),
      timeId: Joi.number().required(),
      date: Joi.string().isoDate().required().options({ convert: false })
    })
  })
);

export default router;

import { celebrate, CelebrateError, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/schedules',
  celebrate({
    [Segments.QUERY]: Joi.object({
      customerId: Joi.number().allow(''),
      activityId: Joi.number().allow(''),
      dateStart: Joi.string().isoDate().allow('').options({ convert: false }),
      dateEnd: Joi.string().isoDate().allow('').options({ convert: false }),
      status: Joi.string().allow(''),
      page: Joi.number().default(1).allow(''),
      limit: Joi.number().default(10).allow('')
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

import { celebrate, CelebrateError, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();

router.get(
  '/schedules',
  celebrate({
    [Segments.QUERY]: Joi.object({
      customerId: Joi.number().optional(),
      page: Joi.number().default(1).optional(),
      limit: Joi.number().default(10).optional()
    })
  })
);

router.post(
  '/schedules',
  celebrate(
    {
      [Segments.BODY]: Joi.object({
        customerId: Joi.number().required(),
        timeId: Joi.number().required(),
        date: Joi.string().isoDate().required()
      })
    },
    { convert: false }
  )
);

export default router;

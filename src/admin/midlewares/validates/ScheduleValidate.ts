import { celebrate, CelebrateError, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ScheduleStatusEnum } from '../../../shared/models/enums/ScheduleStatusEnum';

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
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    })
  })
);

router.post(
  '/schedules',
  celebrate({
    [Segments.BODY]: Joi.object({
      customerId: Joi.number().required(),
      activityId: Joi.number().required(),
      activityScheduleId: Joi.number().required(),
      date: Joi.string().isoDate().required().options({ convert: false })
    })
  })
);

router.put(
  '/schedules/:id/change-status/:status',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
      status: Joi.string()
        .valid(...Object.values(ScheduleStatusEnum))
        .messages({
          'any.only': 'status must be canceled, arrived or completed'
        })
    })
  })
);

export default router;

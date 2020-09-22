import { EndsInEnum } from './../../../shared/models/enums/EndsInEnum';
import { FrequencyEnum } from './../../../shared/models/enums/FrequencyEnum';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const router = Router();
const routeName = '/activities-schedules';
const timePattern = /\d{1,2}:\d{2}(:\d{2})?/;
const timeInvalidMessage = (field: string) => `"${field}" time is invalid`;

router.get(
  routeName,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      start: Joi.date().required(),
      end: Joi.date().required(),
      activityId: Joi.number().integer()
    })
  })
);

router.post(
  routeName,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      activityId: Joi.number().integer().required(),
      title: Joi.string().max(120).required(),
      color: Joi.string().max(7).required(),
      date: Joi.date().required(),
      start: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('start')),
      end: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('end')),
      recurrent: Joi.boolean().optional().default(false),
      recurrentRepeatEvery: Joi.number().integer().when('recurrent', {
        is: true,
        then: Joi.required()
      }),
      recurrentFrequency: Joi.string()
        .valid(...Object.values(FrequencyEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      recurrentWeekdays: Joi.string().when('recurrentFrequency', {
        is: FrequencyEnum.WEEKLY,
        then: Joi.required()
      }),
      recurrentEndsIn: Joi.string()
        .valid(...Object.values(EndsInEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      recurrentUntil: Joi.date().when('recurrentEndsIn', {
        is: EndsInEnum.IN,
        then: Joi.required()
      }),
      recurrentOcurrences: Joi.number().integer().when('recurrentEndsIn', {
        is: EndsInEnum.AFTER,
        then: Joi.required()
      })
    })
  })
);

router.put(
  routeName,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().integer().required(),
      activityId: Joi.number().integer().required(),
      title: Joi.string().max(120).required(),
      color: Joi.string().max(7).required(),
      date: Joi.date().required(),
      start: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('start')),
      end: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('end')),
      recurrent: Joi.boolean().optional().default(false),
      recurrentRepeatEvery: Joi.number().integer().when('recurrent', {
        is: true,
        then: Joi.required()
      }),
      recurrentFrequency: Joi.string()
        .valid(...Object.values(FrequencyEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      recurrentWeekdays: Joi.string().when('recurrentFrequency', {
        is: FrequencyEnum.WEEKLY,
        then: Joi.required()
      }),
      recurrentEndsIn: Joi.string()
        .valid(...Object.values(EndsInEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      recurrentUntil: Joi.date().when('recurrentEndsIn', {
        is: EndsInEnum.IN,
        then: Joi.required()
      }),
      recurrentOcurrences: Joi.number().integer().when('recurrentEndsIn', {
        is: EndsInEnum.AFTER,
        then: Joi.required()
      })
    })
  })
);

router.delete(
  routeName,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().integer().required()
    })
  })
);

export default router;

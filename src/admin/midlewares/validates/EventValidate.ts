import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { EndsInEnum } from '../../../shared/models/enums/EndsInEnum';
import { FrequencyEnum } from '../../../shared/models/enums/FrequencyEnum';

const router = Router();
const routeName = '/activities/schedules';
const timePattern = /\d{1,2}:\d{2}(:\d{2})?/;
const timeInvalidMessage = (field: string) => `"${field}" time is invalid`;

const colorPattern = /^#[\d|a-f]{6}$/i;
const colorErrorMessage = '"color" is invalid';

router.get(
  '/activities/:id/schedules',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().integer()
    }),
    [Segments.QUERY]: Joi.object().keys({
      start: Joi.string().isoDate().required().options({ convert: false }),
      end: Joi.string().isoDate().required().options({ convert: false })
    })
  })
);

router.get(
  '/activities/:id/schedules/days',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().integer()
    }),
    [Segments.QUERY]: Joi.object().keys({
      start: Joi.string().isoDate().required().options({ convert: false }),
      end: Joi.string().isoDate().required().options({ convert: false })
    })
  })
);

router.get(
  '/activities/:id/schedules/days/:day/times',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().integer(),
      day: Joi.string().isoDate().options({ convert: false })
    })
  })
);

router.post(
  routeName,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      activityId: Joi.number().integer().required(),
      title: Joi.string().max(120).required(),
      color: Joi.string()
        .max(7)
        .required()
        .pattern(colorPattern)
        .message(colorErrorMessage),
      date: Joi.string().isoDate().required().options({ convert: false }),
      start: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('start')),
      end: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('end')),
      recurrent: Joi.boolean().optional().default(false),
      repeatEvery: Joi.number().integer().when('recurrent', {
        is: true,
        then: Joi.required()
      }),
      frequency: Joi.string()
        .valid(...Object.values(FrequencyEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      weekdays: Joi.string().when('frequency', {
        is: FrequencyEnum.WEEKLY,
        then: Joi.required()
      }),
      endsIn: Joi.string()
        .valid(...Object.values(EndsInEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      until: Joi.string().isoDate().options({ convert: false }).when('endsIn', {
        is: EndsInEnum.IN,
        then: Joi.required()
      }),
      ocurrences: Joi.number().integer().when('endsIn', {
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
      color: Joi.string()
        .max(7)
        .required()
        .pattern(colorPattern)
        .message(colorErrorMessage),
      date: Joi.string().isoDate().required().options({ convert: false }),
      start: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('start')),
      end: Joi.string()
        .required()
        .pattern(timePattern)
        .message(timeInvalidMessage('end')),
      recurrent: Joi.boolean().optional().default(false),
      repeatEvery: Joi.number().integer().when('recurrent', {
        is: true,
        then: Joi.required()
      }),
      frequency: Joi.string()
        .valid(...Object.values(FrequencyEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      weekdays: Joi.string().when('frequency', {
        is: FrequencyEnum.WEEKLY,
        then: Joi.required()
      }),
      endsIn: Joi.string()
        .valid(...Object.values(EndsInEnum))
        .when('recurrent', {
          is: true,
          then: Joi.required()
        }),
      until: Joi.string()
        .isoDate()
        .when('endsIn', {
          is: EndsInEnum.IN,
          then: Joi.required(),
          otherwise: Joi.allow(null, '')
        })
        .options({ convert: false }),
      ocurrences: Joi.number()
        .integer()
        .when('endsIn', {
          is: EndsInEnum.AFTER,
          then: Joi.required(),
          otherwise: Joi.allow(null, '')
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
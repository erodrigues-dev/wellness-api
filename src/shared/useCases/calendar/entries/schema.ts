import Joi from 'joi';

export const storeSchema = Joi.object({
  calendarId: Joi.string().uuid().required(),
  customerId: Joi.number().required(),
  activityId: Joi.number().required(),
  dateTime: Joi.string().isoDate().required()
});

export const schedulerSchema = Joi.object({
  calendars: Joi.array().items(Joi.string()).required().min(1),
  date: Joi.string().isoDate().required()
});

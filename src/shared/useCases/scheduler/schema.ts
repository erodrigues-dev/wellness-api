import Joi from 'joi';

export const addItemSchema = Joi.object({
  calendarId: Joi.string().uuid().required(),
  customerId: Joi.number().required(),
  activityId: Joi.number().required(),
  dateStart: Joi.string().isoDate().required(),
  notes: Joi.string().max(600)
});

export const updateItemSchema = Joi.object({
  id: Joi.string().uuid().required(),
  calendarId: Joi.string().uuid().required(),
  customerId: Joi.number().required(),
  activityId: Joi.number().required(),
  labelId: Joi.string().uuid(),
  dateStart: Joi.string().isoDate().required(),
  notes: Joi.string().max(600)
});

export const itemsSchema = Joi.object({
  calendars: Joi.array().items(Joi.string()).required().min(1),
  date: Joi.string().isoDate().required()
});

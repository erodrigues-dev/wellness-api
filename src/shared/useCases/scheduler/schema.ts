import Joi from 'joi';

export const addItemSchema = Joi.object({
  dateStart: Joi.string().isoDate().required(),
  calendarId: Joi.string().uuid().required(),
  customerId: Joi.number().required(),
  activityId: Joi.number().required(),
  notes: Joi.string().max(600).allow(null),
  labelId: Joi.string().uuid().allow(null)
});

export const updateItemSchema = Joi.object({
  id: Joi.string().uuid().required(),
  dateStart: Joi.string().isoDate().required(),
  calendarId: Joi.string().uuid().required(),
  customerId: Joi.number().required(),
  activityId: Joi.number().required(),
  labelId: Joi.string().uuid().allow(null),
  notes: Joi.string().max(600).allow(null)
});

export const itemsSchema = Joi.object({
  calendars: Joi.array().items(Joi.string()).required().min(1),
  date: Joi.string().isoDate().required()
});

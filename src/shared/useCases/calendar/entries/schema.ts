import Joi from 'joi';

export const storeSchema = Joi.object({
  calendarId: Joi.string().uuid().required(),
  customerId: Joi.number().required(),
  activityId: Joi.number().required(),
  dateTime: Joi.string().isoDate().required()
});

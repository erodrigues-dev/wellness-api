import joi from 'joi'

export const storeSchema = joi.object({
  calendarId: joi.string().uuid().required(),
  activityId: joi.number().required(),
  dateStart: joi.string().isoDate().required(),
  slots: joi.number().min(1).required(),
  recurrenceRule: joi.string().allow(null),
  recurrenceExceptions: joi.string().allow(null),
  color: joi.string().length(7).required(),
  notes: joi.string().allow(null)
})

export const updateSchema = joi.object({
  id: joi.string().uuid().required(),
  calendarId: joi.string().uuid().required(),
  activityId: joi.number().required(),
  dateStart: joi.string().isoDate().required(),
  slots: joi.number().min(1).required(),
  recurrenceRule: joi.string().allow(null),
  recurrenceExceptions: joi.string().allow(null),
  color: joi.string().length(7).required(),
  notes: joi.string().allow(null)
})

import joi from 'joi'

export const createBlockSchema = joi.object({
  calendarId: joi.string().uuid().required(),
  start: joi.string().isoDate().required(),
  end: joi.string().isoDate().required(),
  recurrenceRule: joi.string().allow(null),
  recurrenceExceptions: joi.array().items(joi.string().isoDate()).default([]).allow(null)
})

export const updateBlockSchema = createBlockSchema.append({
  id: joi.string().uuid().required()
})

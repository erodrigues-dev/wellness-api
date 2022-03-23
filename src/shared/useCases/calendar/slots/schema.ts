import joi from 'joi'

export const createBlockSchema = joi.object({
  calendarId: joi.string().uuid().required(),
  dateStart: joi.string().isoDate().required(),
  dateEnd: joi.string().isoDate().required(),
  recurrenceRule: joi.string().allow(null)
})

export const updateBlockSchema = createBlockSchema.append({
  id: joi.string().uuid().required()
})

export const destroyBlockSchema = joi.object({
  id: joi.string().uuid().required(),
  date: joi.string().isoDate().required(),
  following: joi.boolean().default(false)
})

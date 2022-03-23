import joi from 'joi'

export const createBlockSchema = joi.object({
  calendarId: joi.string().uuid().required(),
  dateStart: joi.string().isoDate().required(),
  dateEnd: joi.string().isoDate().required(),
  recurrenceRule: joi.string().allow(null)
})

export const updateBlockSchema = joi.object({
  data: createBlockSchema.append({
    id: joi.string().uuid().required()
  }),
  updateOptions: joi.object({
    updateOnDate: joi.string().isoDate(),
    updateFollowing: joi.boolean()
  })
})

export const destroyBlockSchema = joi.object({
  id: joi.string().uuid().required(),
  date: joi.string().isoDate().required(),
  following: joi.boolean().default(false)
})

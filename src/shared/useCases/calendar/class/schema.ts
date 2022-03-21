import joi from 'joi'

export const listSchema = joi.object({
  calendars: joi.array().items(joi.string()).min(1).required(),
  date: joi.string().isoDate().required()
})

export const storeSchema = joi.object({
  calendarId: joi.string().uuid().required(),
  activityId: joi.number().required(),
  dateStart: joi.string().isoDate().required(),
  slots: joi.number().min(1).required(),
  recurrenceRule: joi.string().allow(null),
  color: joi.string().length(7).required(),
  notes: joi.string().allow(null)
})

export const updateSchema = joi.object({
  data: joi.object({
    id: joi.string().uuid().required(),
    calendarId: joi.string().uuid().required(),
    activityId: joi.number().required(),
    dateStart: joi.string().isoDate().required(),
    slots: joi.number().min(1).required(),
    recurrenceRule: joi.string().allow(null),
    color: joi.string().length(7).required(),
    notes: joi.string().allow(null)
  }),
  updateOption: joi.string().valid('current', 'current-and-following')
})

export const listAppointmentsSchema = joi.object({
  calendarClassId: joi.string().uuid().required(),
  date: joi.string().isoDate().required()
})

export const destroySchema = joi.object({
  id: joi.string().uuid().required(),
  date: joi.string().isoDate().when('following', {
    is: true,
    then: joi.string().required()
  }),
  following: joi.boolean()
})

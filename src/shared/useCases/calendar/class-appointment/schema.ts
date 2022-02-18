import joi from 'joi'

export const createSchema = joi.object({
  calendarClassId: joi.string().uuid().required(),
  calendarLabelId: joi.string().uuid().allow(null),
  customerId: joi.number().required(),
  dateStart: joi.string().isoDate().required(),
  notes: joi.string().max(600).allow(null, '')
})

export const updateSchema = joi.object({
  id: joi.string().uuid().required(),
  calendarClassId: joi.string().uuid().required(),
  calendarLabelId: joi.string().uuid().allow(null),
  customerId: joi.number().required(),
  dateStart: joi.string().isoDate().required(),
  notes: joi.string().max(600).allow(null, '')
})

import Joi from 'joi'

export const createAppointmentSchema = Joi.object({
  calendarClassId: Joi.string().uuid().allow(null),
  calendarId: Joi.when('calendarClassId', {
    is: Joi.string().required(),
    then: Joi.string().uuid().allow(null),
    otherwise: Joi.string().uuid().required()
  }),
  activityId: Joi.when('calendarClassId', {
    is: Joi.string().required(),
    then: Joi.number().allow(null),
    otherwise: Joi.number().required()
  }),
  dateStart: Joi.string().isoDate().required(),
  customerId: Joi.number().required(),
  calendarLabelId: Joi.string().uuid().allow(null),
  notes: Joi.string().max(600).allow(null, '')
})

export const updateAppointmentSchema = createAppointmentSchema.append({
  id: Joi.string().uuid().required()
})

export const listAppointmentsSchema = Joi.object({
  calendars: Joi.array().items(Joi.string()).required().min(1),
  date: Joi.string().isoDate().required()
})

export const checkAvailabilitySchema = Joi.object({
  calendarId: Joi.string().uuid().required(),
  ignoreAppointmentId: Joi.string().uuid().allow(null),
  date: Joi.string().isoDate().required()
})

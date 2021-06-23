import { Joi } from 'celebrate';

export const createSchema = Joi.object({
  workoutProfileId: Joi.number().required(),
  resume: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  notes: Joi.string().allow(null, '')
});

export const updateSchema = Joi.object({
  id: Joi.number().required(),
  workoutProfileId: Joi.number().required(),
  resume: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  notes: Joi.string().allow(null, '')
});

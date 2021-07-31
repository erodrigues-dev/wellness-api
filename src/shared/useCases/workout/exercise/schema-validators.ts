import { Joi } from 'celebrate';

export const createSchema = Joi.object({
  workoutLogId: Joi.number().required(),
  name: Joi.string().required(),
  notes: Joi.string().allow(null, ''),
  set1Reps: Joi.number().allow(null),
  set1Weight: Joi.number().allow(null),
  set2Reps: Joi.number().allow(null),
  set2Weight: Joi.number().allow(null),
  set3Reps: Joi.number().allow(null),
  set3Weight: Joi.number().allow(null),
  set4Reps: Joi.number().allow(null),
  set4Weight: Joi.number().allow(null)
});

export const updateSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(1).trim(),
  notes: Joi.string().allow(null, ''),
  set1Reps: Joi.number().allow(null),
  set1Weight: Joi.number().allow(null),
  set2Reps: Joi.number().allow(null),
  set2Weight: Joi.number().allow(null),
  set3Reps: Joi.number().allow(null),
  set3Weight: Joi.number().allow(null),
  set4Reps: Joi.number().allow(null),
  set4Weight: Joi.number().allow(null)
});

export const indexSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
  workoutLogId: Joi.number().required()
});

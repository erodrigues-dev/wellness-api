import { Joi } from 'celebrate';

export const createSchema = Joi.object({
  workoutProfileId: Joi.number().required(),
  workoutLogId: Joi.number().required(),
  name: Joi.string().required(),
  notes: Joi.string().allow(null, ''),
  set1Reps: Joi.number(),
  set1Weight: Joi.number(),
  set2Reps: Joi.number(),
  set2Weight: Joi.number(),
  set3Reps: Joi.number(),
  set3Weight: Joi.number(),
  set4Reps: Joi.number(),
  set4Weight: Joi.number()
});

export const updateSchema = createSchema.keys({
  id: Joi.number().required()
});

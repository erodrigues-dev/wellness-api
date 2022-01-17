import { Joi } from 'celebrate';

export const createSchema = Joi.object({
  type: Joi.string().valid('customer', 'team-group').required(),
  customerId: Joi.when('type', {
    is: 'customer',
    then: Joi.number().required(),
    otherwise: Joi.forbidden()
  }),
  teamGroupId: Joi.when('type', {
    is: 'team-group',
    then: Joi.string().uuid().required(),
    otherwise: Joi.forbidden()
  }),
  age: Joi.number().allow(null),
  height: Joi.string().allow(null, ''),
  weight: Joi.number().allow(null),
  goal: Joi.string().allow(null, ''),
  test1: Joi.string().allow(null, ''),
  test2: Joi.string().allow(null, ''),
  injuriesLimitations: Joi.string().allow(null, ''),
  experienceLevel: Joi.string().allow(null, ''),
  notes: Joi.string().allow(null, '')
});

export const updateSchema = Joi.object({
  id: Joi.number().required(),
  age: Joi.number().allow(null),
  height: Joi.string().allow(null, ''),
  weight: Joi.number().allow(null),
  goal: Joi.string().allow(null, ''),
  test1: Joi.string().allow(null, ''),
  test2: Joi.string().allow(null, ''),
  injuriesLimitations: Joi.string().allow(null, ''),
  experienceLevel: Joi.string().allow(null, ''),
  notes: Joi.string().allow(null, '')
});

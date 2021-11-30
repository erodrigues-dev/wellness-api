import { Joi } from 'celebrate';
import TeamGroup from '../../database/models/TeamGroup';

interface Data {
  name: string;
  members: number[];
}

const schema = Joi.object({
  name: Joi.string().max(120).required(),
  members: Joi.array().items(Joi.number()).min(1).required()
});

export class TeamGroupCreateUseCase {
  async handle(data: Data) {
    const { name, members } = await schema.validateAsync(data);

    const transaction = await TeamGroup.sequelize.transaction();
    try {
      const model = await TeamGroup.create({ name }, { transaction });
      await model.setMembers(members, { transaction });
      await transaction.commit();
      return model;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

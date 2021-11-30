import { Joi } from 'celebrate';
import CustomError from '../../custom-error/CustomError';
import TeamGroup from '../../database/models/TeamGroup';

interface Data {
  id: string;
  name: string;
  members: number[];
}

const schema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(120).required(),
  members: Joi.array().items(Joi.number()).min(1).required()
});

export class TeamGroupUpdateUseCase {
  async handle(data: Data) {
    const { id, name, members } = await schema.validateAsync(data);

    const transaction = await TeamGroup.sequelize.transaction();
    try {
      const model = await TeamGroup.findByPk(id);

      if (!model) throw new CustomError('Team group not found', 404);

      model.name = name;

      await model.save({ transaction });
      await model.setMembers(members, { transaction });
      await transaction.commit();
      return model;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

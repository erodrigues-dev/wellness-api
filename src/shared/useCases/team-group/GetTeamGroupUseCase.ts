import CustomError from '../../custom-error/CustomError';
import TeamGroup from '../../database/models/TeamGroup';

export class GetTeamGroupUseCase {
  async handle(id: string) {
    const model = await TeamGroup.findByPk(id, { include: 'members' });

    if (!model) throw new CustomError('Tem group not found', 404);

    return this.parse(model);
  }

  private parse(model) {
    const data = model.toJSON();

    return {
      ...data,
      members: data.members.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email
      }))
    };
  }
}

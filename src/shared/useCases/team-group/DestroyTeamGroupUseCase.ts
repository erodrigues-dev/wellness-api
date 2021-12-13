import CustomError from '../../custom-error/CustomError';
import TeamGroup from '../../database/models/TeamGroup';

export class DestroyTeamGroupUseCase {
  async handle(id: string) {
    const deleteds = await TeamGroup.destroy({
      where: { id }
    });

    if (deleteds === 0) throw new CustomError('Team Group not found', 404);
  }
}

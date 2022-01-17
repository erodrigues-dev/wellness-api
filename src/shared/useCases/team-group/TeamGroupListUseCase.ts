import { Op } from 'sequelize';
import TeamGroup from '../../database/models/TeamGroup';
import { getPaginateOptions } from '../../utils/getPaginateOptions';

interface Data {
  page?: number;
  limit?: number;
  name: string;
  memberName: string;
}

export class TeamGroupListUseCase {
  async list({ page, limit, ...where }: Data) {
    const data = await TeamGroup.findAndCountAll({
      include: 'members',
      ...getPaginateOptions(page, limit),
      ...(await this.buildWhere(where)),
      distinct: true
    });

    return this.parseData(data);
  }

  private async buildWhere({ name, memberName }) {
    const where = {};

    if (name) {
      where['name'] = { [Op.iLike]: `%${name}%` };
    }

    if (memberName) {
      const teams = await TeamGroup.findAll({
        attributes: ['id'],
        include: {
          association: 'members',
          attributes: [],
          where: { name: { [Op.iLike]: `%${memberName}%` } }
        }
      });
      const ids = teams.map(t => t.id);
      where['id'] = { [Op.in]: ids };
    }

    return Promise.resolve({ where });
  }

  private parseData(data) {
    return {
      ...data,
      rows: data.rows
        .map(row => row.toJSON())
        .map(row => ({
          ...row,
          members: row.members.map(({ id, name, email }) => ({ id, name, email }))
        }))
    };
  }
}

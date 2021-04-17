import { Op } from 'sequelize';
import Specialty from '../database/models/Specialty';

interface ListFilter {
  name?: string;
  page?: number;
  limit?: number;
}

interface UpdateData {
  id: number;
  name: string;
}

export class SpecialtyService {
  async list({ name, page, limit }: ListFilter) {
    const where = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
    return Specialty.findAndCountAll({
      limit,
      offset: limit ? (page - 1) * limit : null,
      where,
      order: ['name']
    });
  }

  async get(id: number) {
    return Specialty.findByPk(id);
  }

  async create(name: string) {
    return Specialty.create({
      name
    });
  }

  async udpate(data: UpdateData) {
    await Specialty.update(
      {
        name: data.name
      },
      {
        where: { id: data.id }
      }
    );
  }

  async destroy(id: number) {
    await Specialty.destroy({ where: { id } });
  }
}

export default new SpecialtyService();

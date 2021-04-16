import Specialty from '../database/models/Specialty';

interface ListFilter {
  page?: number;
  limit?: number;
}

interface UpdateData {
  id: number;
  name: string;
}

export class SpecialtyService {
  async list({ page = 1, limit = 10 }: ListFilter) {
    return Specialty.findAndCountAll({
      limit,
      offset: (page - 1) * limit
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

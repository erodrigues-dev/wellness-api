import { Op } from 'sequelize';
import Waiver from '../database/models/Waiver';

type FilterData = {
  page: number;
  limit: number;
  title: string;
};

type CreateData = {
  title: string;
  text: string;
};

type UpdateData = {
  id: number;
  title: string;
  text: string;
};

export class WaiverService {
  list(filter: FilterData) {
    const page = filter.page || 1;
    const limit = filter.limit || 10;

    return Waiver.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      where: {
        title: { [Op.iLike]: `%${filter.title}%` }
      },
      order: ['title']
    });
  }

  get(id: number) {
    return Waiver.findByPk(id);
  }

  create(data: CreateData) {
    return Waiver.create(data);
  }

  update(data: UpdateData) {
    return Waiver.update(data, { where: { id: data.id } });
  }

  destroy(id: number) {
    return Waiver.destroy({ where: { id } });
  }
}

export default new WaiverService();

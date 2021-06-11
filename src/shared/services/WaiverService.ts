import { Op } from 'sequelize';
import CustomerWaiver from '../database/models/CustomerWaiver';
import Waiver from '../database/models/Waiver';

type ListData = {
  page: number;
  limit: number;
  title: string;
};

type ListAllData = {
  ignoreOfCustomerId?: number;
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
  list(filter: ListData) {
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

  async listAll(data: ListAllData) {
    console.log('>> listAll', JSON.stringify(data));
    let ignoreWaivers = [];

    if (data.ignoreOfCustomerId) {
      const customerWaiverIds = await CustomerWaiver.findAll({
        raw: true,
        attributes: ['waiverId'],
        where: { customerId: data.ignoreOfCustomerId }
      });

      ignoreWaivers = customerWaiverIds.map(item => item.waiverId);
    }

    return Waiver.findAll({
      where: {
        id: { [Op.notIn]: ignoreWaivers }
      },
      order: ['title'],
      attributes: ['id', 'title']
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

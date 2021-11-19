import Calendar from '../database/models/Calendar';
import CustomError from '../custom-error/CustomError';
import { getPaginateOptions } from '../utils/getPaginateOptions';
import { Op } from 'sequelize';

export class CalendarService {
  async list({ name, categoryName, page, limit }) {
    const where = {};
    if (name) where['name'] = { [Op.iLike]: `%${name}%` };

    const categoryWhere = {};
    if (categoryName) categoryWhere['name'] = { [Op.iLike]: `%${categoryName}%` };

    return await Calendar.findAndCountAll({
      ...getPaginateOptions(page, limit),
      attributes: {
        exclude: ['categoryId', 'deletedAt']
      },
      where,
      include: {
        association: 'category',
        attributes: ['id', 'name'],
        where: categoryWhere
      },
      order: ['name']
    });
  }

  async get(id) {
    return await Calendar.findByPk(id);
  }

  async create(data) {
    const model = await Calendar.create(data);
    return model.id;
  }

  async update({ id, ...data }) {
    const [rows] = await Calendar.update(data, { where: { id } });

    if (rows === 0) throw new CustomError('Calendar not found', 404);
  }

  async destroy(id) {
    await Calendar.destroy({ where: { id } });
  }
}

import Calendar from '../database/models/Calendar';
import CustomError from '../custom-error/CustomError';
import { getPaginateOptions } from '../utils/getPaginateOptions';
import { Op } from 'sequelize';

export class CalendarService {
  listAll() {
    return Calendar.findAll({
      attributes: {
        exclude: ['categoryId', 'deletedAt']
      },
      include: {
        association: 'category',
        attributes: ['id', 'name']
      },
      order: ['name']
    });
  }

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
    const model = await Calendar.findByPk(id, {
      attributes: {
        exclude: ['categoryId', 'deletedAt']
      },
      include: [
        {
          association: 'category',
          attributes: ['id', 'name']
        },
        {
          association: 'activities',
          attributes: ['id', 'name']
        }
      ]
    });

    return this._parseModel(model.toJSON());
  }

  async listActivities(calendarId) {
    const calendar = await Calendar.findByPk(calendarId, {
      attributes: ['id'],
      include: {
        association: 'activities',
        attributes: ['id', 'name', 'duration']
      }
    });

    return calendar.activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      duration: activity.duration
    }));
  }

  async create({ activities, ...data }) {
    const transaction = await Calendar.sequelize.transaction();
    try {
      const model = await Calendar.create(data as any, { transaction });
      await model.setActivities(activities, { transaction });
      await transaction.commit();
      return model.id;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update({ id, activities, ...data }) {
    const transaction = await Calendar.sequelize.transaction();
    try {
      const [rows] = await Calendar.update(data, { where: { id }, transaction });
      if (rows === 0) throw new CustomError('Calendar not found', 404);

      const model = await Calendar.findByPk(id, { transaction });
      await model.setActivities(activities, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async destroy(id) {
    await Calendar.destroy({ where: { id } });
  }

  _parseModel(model) {
    return {
      ...model,
      activities: model.activities?.map(activity => ({
        id: activity.id,
        name: activity.name
      }))
    };
  }
}

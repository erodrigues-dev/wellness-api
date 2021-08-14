import { literal } from 'sequelize';
import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Notification from '../database/models/Notification';
import { getPaginateOptions } from '../utils/getPaginateOptions';

export class NotificationService {
  async list({ page, limit, title }) {
    const query = await Notification.findAndCountAll({
      ...getPaginateOptions(page, limit),
      include: [
        {
          association: 'createdBy',
          attributes: ['id', 'name']
        }
      ],
      where: {
        [Op.and]: this.buildWhere(title)
      },
      order: [['createdAt', 'desc']]
    });

    return {
      count: query.count,
      rows: this.parseToListViewModel(query.rows)
    };
  }

  async get(id: number) {
    const model = await Notification.findByPk(id, {
      include: [
        {
          association: 'createdBy',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!model) throw new CustomError('Notification not found', 404);

    return this.parseToViewModel(model);
  }

  async store(data) {
    await Notification.create(data);
  }

  async destroy(id) {
    await Notification.destroy({
      where: { id }
    });
  }

  async listUnread({ page, limit, employeeId }) {
    const query = await Notification.findAndCountAll({
      ...getPaginateOptions(page, limit),
      include: [
        {
          association: 'createdBy',
          attributes: ['id', 'name']
        }
      ],
      where: {
        id: {
          [Op.notIn]: literal(
            `(select notification_id from notification_read_by_employees where employee_id = ${employeeId})`
          )
        },
        createdById: { [Op.ne]: employeeId }
      },
      order: [['createdAt', 'desc']]
    });

    return {
      count: query.count,
      rows: this.parseToListViewModel(query.rows)
    };
  }

  async markAsRead({ notificationId, employeeId }) {
    const model = await Notification.findByPk(notificationId, { attributes: ['id'] });
    await model.addReadBy(employeeId);
  }

  async markAsUnread({ notificationId, employeeId }) {
    const model = await Notification.findByPk(notificationId, { attributes: ['id'] });
    await model.removeReadBy(employeeId);
  }

  async markAllAsRead({ employeeId }) {
    const list = await Notification.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.notIn]: literal(
            `(select notification_id from notification_read_by_employees where employee_id = ${employeeId})`
          )
        },
        createdById: { [Op.ne]: employeeId }
      }
    });

    const query =
      'insert into notification_read_by_employees (notification_id, employee_id, created_at, updated_at) values';
    const values = list.map(notification => `(${notification.id}, ${employeeId}, now(), now())`);

    if (values.length > 0) await Notification.sequelize.query(`${query} ${values.join(', ')};`);
  }

  private parseToListViewModel(models: Notification[]) {
    return models.map(this.parseToViewModel);
  }

  private parseToViewModel(model: Notification) {
    return {
      id: model.id,
      title: model.title,
      text: model.text,
      createdAt: model.createdAt,
      createdBy: model.createdBy
    };
  }

  private buildWhere(title: string) {
    const where = [];

    if (title) {
      where.push({
        title: { [Op.iLike]: `%${title}%` }
      });
    }

    return where;
  }
}

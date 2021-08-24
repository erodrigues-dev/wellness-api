import { literal } from 'sequelize';
import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Notification from '../database/models/Notification';
import NotificationEmployee from '../database/models/NotificationEmployee';
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

  async listByEmployee({ page, limit, employeeId }) {
    const notificationEmployees = await NotificationEmployee.findAll({
      attributes: ['notificationId'],
      where: { employeeId }
    });

    const reads = notificationEmployees.map(item => item.notificationId);

    const notifications = await Notification.findAndCountAll({
      ...getPaginateOptions(page, limit),
      include: {
        association: 'createdBy',
        attributes: ['id', 'name', 'imageUrl']
      },
      where: { createdById: { [Op.ne]: employeeId } },
      order: [
        ['createdAt', 'DESC'],
        ['title', 'ASC']
      ]
    });

    return {
      unreads: notifications.count - reads.length,
      total: notifications.count,
      rows: notifications.rows.map(item => ({
        id: item.id,
        title: item.title,
        text: item.text,
        createdBy: item.createdBy,
        createdAt: item.createdAt,
        read: reads.some(readId => readId === item.id)
      }))
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
      include: {
        association: 'readBy',
        attributes: ['id'],
        where: { id: employeeId },
        required: false
      },
      where: {
        '$readBy.id$': { [Op.is]: null },
        createdById: { [Op.ne]: employeeId }
      }
    });

    if (list.length > 0) {
      await NotificationEmployee.bulkCreate(
        list.map(({ id: notificationId }) => ({
          notificationId,
          employeeId
        }))
      );
    }
  }

  async markAllAsUnread({ employeeId }) {
    await NotificationEmployee.destroy({
      where: { employeeId }
    });
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

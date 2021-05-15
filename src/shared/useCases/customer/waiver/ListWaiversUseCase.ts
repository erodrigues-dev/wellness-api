import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class ListWaiverUseCase {
  async handle(customerId: number, page: number, limit: number) {
    const hasPagination = Boolean(page && limit);
    const paginateOptions = hasPagination
      ? {
          limit: limit,
          offset: (page - 1) * limit
        }
      : {};
    const result = await CustomerWaiver.findAndCountAll({
      where: { customerId },
      attributes: {
        exclude: ['customerId', 'waiverId']
      },
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'waiver',
          attributes: ['id', 'title']
        }
      ],
      order: [['signedAt', 'desc']],
      ...paginateOptions
    });

    return result;
  }
}

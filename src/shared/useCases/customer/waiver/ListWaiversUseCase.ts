import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class ListWaiverUseCase {
  async handle(customerId: number, page: number, limit: number) {
    const paginateOptions = this.getPaginationOptions(page, limit);
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

  private getPaginationOptions(page: number, limit: number) {
    const hasPagination = Boolean(page && limit);
    if (hasPagination)
      return {
        limit: limit,
        offset: (page - 1) * limit
      };

    return {};
  }
}

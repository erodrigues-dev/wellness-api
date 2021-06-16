import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class GetWaiverDetailUseCase {
  async handle(customerId: number, waiverId: number) {
    const result = await CustomerWaiver.findOne({
      where: { customerId, waiverId },
      include: [
        {
          association: 'waiver',
          attributes: ['id', 'title', 'text']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
        }
      ]
    });

    return {
      customer: {
        id: result.customer.id,
        name: result.customer.name
      },
      waiver: {
        id: result.waiver.id,
        title: result.waiver.title,
        text: result.waiver.text
      },
      signedUrl: result.signedUrl,
      signedAt: result.signedAt,
      createdAt: result.createdAt
    };
  }
}

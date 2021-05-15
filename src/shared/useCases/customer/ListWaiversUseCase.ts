import CustomerWaiver from '../../database/models/CustomerWaiver';

export class ListWaiverUseCase {
  async handle(customerId: number) {
    const list = await CustomerWaiver.findAll({
      where: { customerId },
      include: {
        association: 'waiver',
        attributes: ['id', 'title']
      }
    });

    console.log(`>> list`, list);

    return list;
  }
}

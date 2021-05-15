import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class DeleteWaiverUseCase {
  async handle(customerId: number, waiverId: number) {
    await CustomerWaiver.destroy({
      where: {
        customerId,
        waiverId
      }
    });
  }
}

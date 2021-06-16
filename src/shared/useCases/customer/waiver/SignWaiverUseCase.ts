import CustomerWaiver from '../../../database/models/CustomerWaiver';

interface WaiverSignData {
  customerId: number;
  waiverId: number;
  signedUrl: string;
}

export class SignWaiverUserCase {
  async handle(data: WaiverSignData) {
    await CustomerWaiver.update(
      {
        signedUrl: data.signedUrl,
        signedAt: new Date()
      },
      {
        where: {
          customerId: data.customerId,
          waiverId: data.waiverId
        }
      }
    );
  }
}

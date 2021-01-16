import { AxiosInstance } from 'axios';

export class SendEmailSignUpModel {
  name: string;
  email: string;
  tempPassword: string;
}

export class SendEmailCustomer {
  constructor(private api: AxiosInstance) {}

  async sendSignUp(sendEmail: SendEmailSignUpModel): Promise<void> {
    const { name, email, tempPassword } = sendEmail;
    await this.api.post('/', {
      to: [{ name, email: process.env.SENDINGBLUE_DEV_EMAIL ?? email }],
      templateId: 1,
      params: { tempPassword }
    });
  }
}

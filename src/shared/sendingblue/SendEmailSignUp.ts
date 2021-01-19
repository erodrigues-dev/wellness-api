import { AxiosInstance } from 'axios';

import { SendingBlueTemplate } from './SendingBlueTemplate';

type SendEmail = {
  name: string;
  email: string;
  tempPassword: string;
};

export class SendEmailSignUp {
  constructor(private api: AxiosInstance) {}

  async send(sendEmail: SendEmail): Promise<void> {
    const { name, email, tempPassword } = sendEmail;
    await this.api.post('/', {
      to: [{ name, email }],
      params: { tempPassword },
      templateId: SendingBlueTemplate.SignUp.id
    });
  }
}

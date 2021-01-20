import { AxiosInstance } from 'axios';

import { SendEmailService } from './SendEmailService';
import { SendingBlueTemplate } from './SendingBlueTemplate';

type SendEmail = {
  name: string;
  email: string;
  tempPassword: string;
};

export class SendEmailRecoverPassword {
  constructor(private service: SendEmailService) {}

  async send(sendEmail: SendEmail): Promise<void> {
    const { name, email, tempPassword } = sendEmail;
    await this.service.send({
      to: [{ name, email }],
      params: { tempPassword },
      templateId: SendingBlueTemplate.RecoverPassword.id
    });
  }
}

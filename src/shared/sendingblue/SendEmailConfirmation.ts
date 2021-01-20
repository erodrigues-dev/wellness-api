import { SendEmailService } from './SendEmailService';
import { SendingBlueTemplate } from './SendingBlueTemplate';

export class SendEmailConfirmation {
  constructor(private service: SendEmailService) {}

  async send(name: string, email: string, code: string): Promise<void> {
    await this.service.send({
      to: [{ name, email }],
      params: { code },
      templateId: SendingBlueTemplate.EmailConfirmation.id
    });
  }
}

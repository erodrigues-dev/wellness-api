import { AxiosInstance } from 'axios';

import { SendingBlueTemplate } from './SendingBlueTemplate';

export class SendEmailConfirmation {
  constructor(private api: AxiosInstance) {}

  async send(name: string, email: string, code: string): Promise<void> {
    await this.api.post('/', {
      to: [{ name, email }],
      params: { code },
      templateId: SendingBlueTemplate.EmailConfirmation.id
    });
  }
}

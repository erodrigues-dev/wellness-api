import { AxiosInstance } from 'axios';

export class SendEmailConfirmation {
  constructor(private api: AxiosInstance) {}

  async send(name: string, email: string, code: string): Promise<void> {
    await this.api.post('/', {
      to: [{ name, email }],
      params: { code }
    });
  }
}

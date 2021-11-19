import { AxiosInstance } from 'axios';

type SendinBlueEmail = {
  to: {
    name: string;
    email: string;
  }[];
  params: any;
  templateId: number;
};

export class SendEmailService {
  constructor(private api: AxiosInstance) {}

  async send(email: SendinBlueEmail): Promise<void> {
    const overrideEmail = {
      ...email,
      to: email.to.map(to => ({
        name: to.name,
        email: process.env.SENDINGBLUE_DEV_EMAIL || to.email
      }))
    };
    await this.api.post('/', overrideEmail);

    if (process.env.SENDINGBLUE_DEV_EMAIL) {
      console.log(JSON.stringify(email, null, 2));
    }
  }
}

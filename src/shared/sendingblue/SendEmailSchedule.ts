import { SendEmailService } from './SendEmailService';
import { SendingBlueTemplate } from './SendingBlueTemplate';

type SendEmail = {
  name: string;
  email: string;
  title: string;
  date: string;
  start: string;
  end: string;
};

export class SendEmailSchedule {
  constructor(private service: SendEmailService) {}

  async sendCreate(sendEmail: SendEmail): Promise<void> {
    await this.service.send({
      to: [
        {
          name: sendEmail.name,
          email: sendEmail.email
        }
      ],
      params: {
        title: sendEmail.title,
        date: sendEmail.date,
        start: sendEmail.start,
        end: sendEmail.end
      },
      templateId: SendingBlueTemplate.ScheduleCreate.id
    });
  }

  async sendCancel(sendEmail: SendEmail): Promise<void> {
    await this.service.send({
      to: [
        {
          name: sendEmail.name,
          email: sendEmail.email
        }
      ],
      params: {
        title: sendEmail.title,
        date: sendEmail.date,
        start: sendEmail.start,
        end: sendEmail.end
      },
      templateId: SendingBlueTemplate.ScheduleCancel.id
    });
  }
}

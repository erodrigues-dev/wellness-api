import { OrderItemTypeEnum, PaymentTypeEnum, RecurrencyPayEnum } from '../models/enums';
import { formatDateToDisplay } from '../utils/date-utils';
import { formatMoney } from '../utils/number-utils';
import { SendEmailService } from './SendEmailService';
import { SendingBlueTemplate } from './SendingBlueTemplate';

type SendEmail = {
  to: {
    name: string;
    email: string;
  };
  params: Params;
};

type Params = {
  name: string;
  recurrency: RecurrencyPayEnum;
  canceledDate: Date;
  paidUntilDate: Date;
};

export class SendEmailOrderCancel {
  constructor(private service: SendEmailService) {}

  async send(sendEmail: SendEmail): Promise<void> {
    await this.service.send({
      to: [sendEmail.to],
      params: this.formatParams(sendEmail.params),
      templateId: SendingBlueTemplate.OrderCancel.id
    });
  }

  private formatParams(params: Params): any {
    return {
      name: params.name,
      recurrency: params.recurrency,
      canceledDate: formatDateToDisplay(params.canceledDate),
      paidUntilDate: formatDateToDisplay(params.paidUntilDate)
    };
  }
}

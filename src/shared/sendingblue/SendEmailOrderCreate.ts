import { OrderItemTypeEnum, PaymentTypeEnum, RecurrencyPayEnum } from '../models/enums';
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
  type: OrderItemTypeEnum;
  name: string;
  quantity: number;
  discount: number;
  total: number;
  paymentType: PaymentTypeEnum;
  recurrency: RecurrencyPayEnum;
};

export class SendEmailOrderCreate {
  constructor(private service: SendEmailService) {}

  async send(sendEmail: SendEmail): Promise<void> {
    await this.service.send({
      to: [sendEmail.to],
      params: this.formatParams(sendEmail.params),
      templateId: SendingBlueTemplate.OrderCreate.id
    });
  }

  private formatParams(params: Params): any {
    return {
      type: this.firstLetterUpperCase(params.type),
      name: params.name,
      quantity: params.quantity,
      discount: formatMoney(params.discount || 0),
      total: formatMoney(params.total),
      paymentType: params.paymentType,
      recurrency: params.recurrency
    };
  }

  private firstLetterUpperCase(value: string) {
    return value.replace(/^./, replaceValue => replaceValue.toUpperCase());
  }
}

export class SendingBlueTemplate {
  static SignUp = {
    id: 1,
    name: 'sign-up',
    params: ['tempPassword']
  } as const;

  static RecoverPassword = {
    id: 2,
    name: 'recover-password',
    params: ['tempPassword']
  } as const;

  static EmailConfirmation = {
    id: 3,
    name: 'email-confirmation',
    params: ['code']
  } as const;

  static ScheduleCreate = {
    id: 4,
    name: 'create-schedule',
    params: ['title', 'date', 'start', 'end']
  } as const;

  static ScheduleCancel = {
    id: 5,
    name: 'cancel-schedule',
    params: ['title', 'date', 'start', 'end']
  } as const;

  static OrderCreate = {
    id: 6,
    name: 'order-create',
    params: ['type', 'name', 'quantity', 'discount', 'total', 'paymentType']
  } as const;

  static OrderCancel = {
    id: 7,
    name: 'order-cancel',
    params: ['name', 'recurrency', 'canceledDate', 'paidUntilDate']
  } as const;
}

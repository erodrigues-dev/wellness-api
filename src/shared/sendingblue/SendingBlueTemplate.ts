export class SendingBlueTemplate {
  static SignUp = {
    id: 1,
    name: 'sign-up',
    params: ['tempPassword']
  } as const;

  static EmailConfirmation = {
    id: 3,
    name: 'email-confirmation',
    params: ['code']
  } as const;
}

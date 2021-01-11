export enum PaymentStatusEnum {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export const PAID_STATUS = [
  PaymentStatusEnum.Active,
  PaymentStatusEnum.Completed
];

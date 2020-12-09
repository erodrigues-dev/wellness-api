import { Transaction } from 'sequelize/types';

export class SquareWebhook<T> {
  type: string;
  event_id: string;
  created_at: string;

  data: {
    type: string;
    id: string;
    object: {
      [key: string]: T;
    };
  };
}

import { EndsInEnum } from '../enums/EndsInEnum';
import { FrequencyEnum } from '../enums/FrequencyEnum';

export default interface IActivitySchedule {
  id?: number;
  activityId: number;
  title: string;
  color: string;
  date: Date;
  start: string;
  end: string;

  recurrent: boolean;
  repeatEvery?: number;
  frequency?: FrequencyEnum;
  weekdays?: string;
  endsIn?: EndsInEnum;
  until?: Date;
  ocurrences?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

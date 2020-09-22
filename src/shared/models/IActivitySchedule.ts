import { FrequencyEnum } from './enums/FrequencyEnum';
import { EndsInEnum } from './enums/EndsInEnum';
export default interface IActivitySchedule {
  id?: number;
  activityId: number;
  title: string;
  color: string;
  date: Date;
  start: string;
  end: string;

  recurrent: boolean;
  recurrentRepeatEvery?: number;
  recurrentFrequency?: FrequencyEnum;
  recurrentWeekdays?: string;
  recurrentEndsIn?: EndsInEnum;
  recurrentUntil?: Date;
  recurrentOcurrences?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

import { Frequency } from 'rrule';

export enum FrequencyEnum {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

const map = new Map([
  [FrequencyEnum.DAILY, Frequency.DAILY],
  [FrequencyEnum.WEEKLY, Frequency.WEEKLY],
  [FrequencyEnum.MONTHLY, Frequency.MONTHLY]
]);

export function convertToRRuleFrequency(item: FrequencyEnum) {
  return map.get(item);
}

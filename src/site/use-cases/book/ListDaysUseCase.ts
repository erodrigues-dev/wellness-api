import { addDays, subDays, startOfMonth, endOfMonth } from 'date-fns';

import { ListDaysUseCase as UseCase } from '../../../shared/useCases/schedule/ListDaysUseCase';

export class ListDaysUseCase {
  handle(activityId: number, referenceDate: Date): Promise<string[]> {
    const [start, end] = this.buildInterval(referenceDate);

    console.log('>> search by dates', start, end);

    return new UseCase(activityId, start, end).list();
  }

  private buildInterval(date: Date): [Date, Date] {
    const start = subDays(startOfMonth(date), 7);
    const end = addDays(endOfMonth(date), 7);

    return [start, end];
  }
}

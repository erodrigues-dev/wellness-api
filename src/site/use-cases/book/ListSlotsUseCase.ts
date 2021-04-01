import { startOfDay } from 'date-fns';
import { ListTimesUseCase } from '../../../shared/useCases/schedule';

export class ListSlotsUseCase {
  handle(activity_id: number, day: Date) {
    const use_case = new ListTimesUseCase(activity_id, startOfDay(day));

    return use_case.list();
  }
}

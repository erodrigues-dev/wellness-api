import { NotFoundError } from '../../custom-error';
import CalendarEntry from '../../database/models/CalendarEntry';

export class SchedulerGetItemUseCase {
  async handle(id) {
    const model = await CalendarEntry.findByPk(id);
    if (!model) throw new NotFoundError('Scheduler item not found');

    return model;
  }
}

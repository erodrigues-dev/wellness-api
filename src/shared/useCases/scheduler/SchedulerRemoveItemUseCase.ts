import CalendarEntry from '../../database/models/CalendarEntry';

export class SchedulerRemoveItemUseCase {
  async handle(id) {
    await CalendarEntry.destroy({
      where: { id }
    });
  }
}

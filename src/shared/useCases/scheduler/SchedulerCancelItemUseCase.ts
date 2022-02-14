import CalendarEntry from '../../database/models/CalendarEntry';

export class SchedulerCancelItemUseCase {
  async handle(id: string) {
    await CalendarEntry.update(
      {
        canceledAt: new Date()
      },
      {
        where: { id }
      }
    );
  }
}

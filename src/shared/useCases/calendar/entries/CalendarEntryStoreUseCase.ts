import CalendarEntry from '../../../database/models/CalendarEntry';
import { storeSchema } from './schema';

export class CalendarEntryStoreUseCase {
  async handle(data) {
    const validData = await storeSchema.validateAsync(data);

    const { id } = await CalendarEntry.create(validData);

    return id;
  }
}

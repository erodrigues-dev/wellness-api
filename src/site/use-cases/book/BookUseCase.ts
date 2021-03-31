import { ScheduleCreateUseCase } from '../../../shared/useCases/schedule';

interface Data {
  user_id: number;
  activity_id: number;
  slot_id: number;
}

export class BookUseCase {
  async handle(data: Data): Promise<void> {
    // listar orderActivityId(s)
    // verificar disponibilidade e usar
    // new ScheduleCreateUseCase(data.user_id, )
  }
}

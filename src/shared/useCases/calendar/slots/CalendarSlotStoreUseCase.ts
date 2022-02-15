import Model from '../../../database/models/CalendarSlot'

type DataItem = {
  id: string
  start: Date
  end: Date
  recurrenceRule: string
  recurrenceExceptions: Date[]
  status: string
}

type Data = {
  calendarId: number
  created: DataItem[]
  updated: DataItem[]
  deleted: DataItem[]
}

export class CalendarSlotStoreUseCase {
  async handle({ calendarId, created, updated, deleted }: Data) {
    await Promise.all(
      created.map(async item => {
        await Model.create({
          ...item,
          calendarId,
          recurrenceExceptions: JSON.stringify(item.recurrenceExceptions || [])
        })
      })
    )

    await Promise.all(
      updated.map(async ({ id, ...item }) => {
        await Model.update(
          {
            ...item,
            calendarId,
            recurrenceExceptions: JSON.stringify(item.recurrenceExceptions || [])
          },
          { where: { id } }
        )
      })
    )

    await Promise.all(
      deleted.map(async ({ id }) => {
        await Model.destroy({ where: { id } })
      })
    )
  }
}

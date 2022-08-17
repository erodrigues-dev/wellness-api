import { rrulestr } from 'rrule'
import { isSameDay, parseISO, startOfDay } from './date-utils'

interface Data {
  rrule: string
  exceptions: string
  date: string
}

export class RecurrenceUtil {
  hasDateInRecurrence({ rrule, exceptions, date }: Data): boolean {
    if (!rrule) return true
    const dateOnly = startOfDay(parseISO(date))
    if (this.isExceptionDate(exceptions, dateOnly)) {
      return false
    }
    return this.dateInRecurrenceRule(rrule, dateOnly)
  }

  private isExceptionDate(recurrenceExceptions: string, date: Date) {
    const exceptions = JSON.parse(recurrenceExceptions || '[]').map(exceptionDate =>
      parseISO(exceptionDate)
    ) as Date[]

    return exceptions.some(exceptionDate => isSameDay(date, exceptionDate))
  }

  private dateInRecurrenceRule(recurrenceRule: string, date: Date) {
    const rule = rrulestr(recurrenceRule)

    const nextDate = rule.after(date, true)

    return isSameDay(nextDate, date)
  }
}

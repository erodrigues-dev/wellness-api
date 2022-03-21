import { format, parse } from 'date-fns'

export { addMinutes, parseISO, startOfDay, isSameDay, formatISO } from 'date-fns'

export function formatTime24To12(time: string): string {
  const dateTime = parse(time, 'HH:mm:ss', new Date())
  return format(dateTime, 'hh:mm aa')
}

export function formatDateToDisplay(date: Date | string) {
  if (!date) return null
  return format(new Date(date), 'MM/dd/yyyy')
}

export function convertToDate(value: string): Date {
  return new Date(value.replace('Z', ''))
}

export function getDate(value: string) {
  let isoDate = value

  if (!isoDate.includes('T')) isoDate = new Date(value).toISOString()

  return isoDate.split('T')[0]
}

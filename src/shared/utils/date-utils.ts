import { format, parse, addMinutes } from 'date-fns';

export function formatTime24To12(time: string): string {
  const dateTime = parse(time, 'HH:mm:ss', new Date());
  return format(dateTime, 'hh:mm aa');
}

export function formatDateToDisplay(date: Date | string) {
  if (!date) return null;
  return format(new Date(date), 'MM/dd/yyyy');
}

export function convertToDate(value: string): Date {
  return new Date(value.replace('Z', ''));
}

export { addMinutes };

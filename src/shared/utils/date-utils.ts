import { format, parse } from 'date-fns';

export function formatTime24To12(time: string): string {
  const dateTime = parse(time, 'HH:mm:ss', new Date());
  return format(dateTime, 'hh:mm aa');
}

export function formatDateToDisplay(date: Date | string) {
  return format(new Date(date), 'MM/dd/yyyy');
}

import { months } from './generateMonth';

export function parseDate(date: Date = new Date()) {
  const today = date.toString().split(' ');
  const day = +today[2];
  const year = +today[3];
  const month = months.findIndex(name => name.includes(today[1]));

  return [day, year, month];
}

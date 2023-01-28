/* eslint-disable no-plusplus */
export const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function monthStart(currentMonth: number, year: number) {
  const date = new Date(year, currentMonth, 1)
    .toString()
    .split(' ');

  return [date[0], date[2]];
}

function monthEnd(currentMonth: number, year: number) {
  const date = new Date(year, currentMonth + 1, 0)
    .toString()
    .split(' ');

  return [date[0], date[2]];
}

function findIndex(current: string) {
  const short = current.slice(0, 2);

  return days.findIndex(day => day === short);
}

export function generateMonth(currentMonth: number, year: number) {
  const start = monthStart(currentMonth, year);
  const end = monthEnd(currentMonth, year);

  let startIndex = findIndex(start[0]);
  const month = [];

  if (days[startIndex] !== 'Mo') {
    const previousMounth = currentMonth === 0 ? 11 : currentMonth - 1;
    const endPrevious = monthEnd(previousMounth, year);
    let data = +endPrevious[1];
    let copyIndex = startIndex - 1;

    while (copyIndex !== -1) {
      month.unshift([days[copyIndex], data, false]);

      data--;
      copyIndex--;
    }
  }

  for (let i = 1; i <= +end[1]; i++) {
    if (startIndex >= 7) {
      startIndex = 0;
    }

    month.push([days[startIndex], i, true]);

    startIndex++;
  }

  let nextData = 1;

  while (startIndex !== 7) {
    month.push([days[startIndex], nextData, false]);

    nextData++;
    startIndex++;
  }

  return month;
}

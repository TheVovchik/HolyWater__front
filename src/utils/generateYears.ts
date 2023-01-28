/* eslint-disable no-plusplus */
export function generateYears(year: number) {
  const yearsList = [];

  const start = year - 10;
  const end = year + 10;

  for (let i = start; i <= end; i++) {
    yearsList.push(`${i}`);
  }

  return yearsList;
}

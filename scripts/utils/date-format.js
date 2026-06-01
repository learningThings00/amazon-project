import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();

export function dateFormat(value) {
  const deliveryDate = today.add(value.deliveryTime, 'days');
  return deliveryDate.format('dddd, MMMM D');
}

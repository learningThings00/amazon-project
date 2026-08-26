import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();

function isWeekend(date) {
  return date.format('dddd') === 'Sunday' || date.format('dddd') === 'Saturday';
}

export function dateFormat(value) {
  let deliveryDate = today;
  let days = value.deliveryTime;
  while (days > 0) {
    deliveryDate = deliveryDate.add(1, 'days');
    if (!isWeekend(deliveryDate)) {
      days--;
    }
  }
  return deliveryDate.format('dddd, MMMM D');
}

export default function isFutureDate(date) {
  let [year, month, day] = date.split("-");

  const reservationDate = new Date(year, month - 1, day, 0, 0, 0);
  const today = new Date();

  return reservationDate >= today;
}

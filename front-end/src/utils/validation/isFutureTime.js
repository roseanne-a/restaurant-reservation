export default function isFutureTime(date, time) {
  let dateNumbers = date.split("-");
  let timeNumbers = time.split(":");
  const today = new Date();
  let reservationDate = new Date(
    dateNumbers[0],
    dateNumbers[1] - 1,
    dateNumbers[2],
    timeNumbers[0],
    timeNumbers[1]
  );

  return reservationDate > today;
}

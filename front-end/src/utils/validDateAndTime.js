import { today } from "./date-time";

export function isDuringBusinessHours(time) {
  const newTime = Number(time.replace(":", ""));
  return newTime >= 1030 && newTime <= 2130;
}

export function isFutureDate(date) {
  let [year, month, day] = date.split("-");
  let [todayYear, todayMonth, todayDay] = today().split("-");

  const reservationDate = new Date(year, month - 1, day, 0, 0, 0);
  const todayWithTime = new Date(todayYear, todayMonth - 1, todayDay, 0, 0, 0);

  return reservationDate >= todayWithTime;
}

export function isFutureTime(date, time) {
  let dateNumbers = date.split("-");
  let timeNumbers = time.split(":");
  const todaysDate = new Date();
  let reservationDate = new Date(
    dateNumbers[0],
    dateNumbers[1] - 1,
    dateNumbers[2],
    timeNumbers[0],
    timeNumbers[1]
  );

  return reservationDate > todaysDate;
}

export function isNotTuesday(date) {
  const dateNumbers = date.split("-");
  let day = new Date(
    dateNumbers[0],
    dateNumbers[1] - 1,
    dateNumbers[2]
  ).getDay();
  return !(day === 2);
}

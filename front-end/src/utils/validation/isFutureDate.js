import { today } from "../date-time";

export default function isFutureDate(date) {
  let [year, month, day] = date.split("-");
  let [todayYear, todayMonth, todayDay] = today().split("-");

  const reservationDate = new Date(year, month - 1, day, 0, 0, 0);
  const todayWithTime = new Date(todayYear, todayMonth - 1, todayDay, 0, 0, 0);

  return reservationDate >= todayWithTime;
}

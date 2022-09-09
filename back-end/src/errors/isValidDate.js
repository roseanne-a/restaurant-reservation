const today = require("../utils/date-time");

function isFutureDate(date) {
  let [year, month, day] = date.split("-");
  let [todayYear, todayMonth, todayDay] = today().split("-");

  const reservationDate = new Date(year, month - 1, day, 0, 0, 0);
  const todayWithTime = new Date(todayYear, todayMonth - 1, todayDay, 0, 0, 0);

  return reservationDate >= todayWithTime;
}

function isValidDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;

  const dateToCheck = new Date(reservation_date);
  let dateNumbers = reservation_date.split("-");
  let day = new Date(
    dateNumbers[0],
    dateNumbers[1] - 1,
    dateNumbers[2]
  ).getDay();

  if (isNaN(dateToCheck.getDate())) {
    next({ status: 400, message: `reservation_date is not a valid date` });
  } else if (!isFutureDate(reservation_date)) {
    next({
      status: 400,
      message: `reservation_date must be a date in the future`,
    });
  } else if (day === 2) {
    next({
      status: 400,
      message: `reservation_date is closed because it falls on a Tuesday`,
    });
  } else next();
}

module.exports = isValidDate;

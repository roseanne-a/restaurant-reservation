function isNotFinished(req, res, next) {
  const statues = ["booked", "seated", "finished", "cancelled"];
  const { data: { status } = {} } = req.body;
  let reservation = res.locals.reservation;
  if (reservation.status === "finished") {
    next({
      status: 400,
      message: `That reservations is already finished.`,
    });
  } else if (statues.indexOf(status.toLowerCase()) === -1) {
    next({
      status: 400,
      message: `${status} is not valid. Only booked, seated, and finished are valid.`,
    });
  } else next();
}

module.exports = isNotFinished;

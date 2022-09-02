const service = require("../reservations/reservations.service");

async function reservationExists(req, res, next) {
  let { reservation_id } = req.params;
  if (!reservation_id) reservation_id = req.body.data.reservation_id;

  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found.`,
    });
  }
}

module.exports = reservationExists;

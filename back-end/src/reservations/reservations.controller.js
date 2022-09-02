/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyHasProperty = require("../errors/bodyHasProperty");
const isValidDate = require("../errors/isValidDate");
const isValidTime = require("../errors/isValidTime");
const isValidNumberOfPeople = require("../errors/isValidNumberOfPeople");
const reservationExists = require("../errors/reservationExists");

async function list(req, res) {
  const { date } = req.query;
  const listOfRes = await service.list(date);

  res.json({
    data: listOfRes,
  });
}

function read(req, res) {
  let reservation = res.locals.reservation;

  res.json({ data: reservation });
}

async function create(req, res) {
  const { data } = req.body;
  const createdReservation = await service.create(data);
  res.status(201).json({
    data: createdReservation,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    bodyHasProperty("first_name"),
    bodyHasProperty("last_name"),
    bodyHasProperty("mobile_number"),
    bodyHasProperty("reservation_date"),
    isValidDate,
    bodyHasProperty("reservation_time"),
    isValidTime,
    bodyHasProperty("people"),
    isValidNumberOfPeople,
    asyncErrorBoundary(create),
  ],
};

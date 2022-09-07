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
const isValidStatus = require("../errors/isValidStatus");
const isNotFinished = require("../errors/isNotFinished");

async function list(req, res, next) {
  const { date, mobile_number } = req.query;
  let results = [];
  if (date) {
    results = await service.list(date);
  } else if (mobile_number) results = await service.search(mobile_number);

  res.json({
    data: results,
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

async function update(req, res) {
  const { data } = req.body;
  const { reservation_id } = req.params;
  const updatedReservation = await service.update(reservation_id, data);

  res.status(200).json({
    data: updatedReservation,
  });
}

async function updateStatus(req, res, next) {
  let { status } = req.body.data;
  const { reservation_id } = req.params;

  status = status.toLowerCase();

  const updatedReservation = await service.updateStatus(reservation_id, status);

  res.status(200).json({ data: updatedReservation });
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
    asyncErrorBoundary(isValidStatus),
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    bodyHasProperty("status"),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(isNotFinished),
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    bodyHasProperty("first_name"),
    bodyHasProperty("last_name"),
    bodyHasProperty("mobile_number"),
    bodyHasProperty("reservation_date"),
    isValidDate,
    bodyHasProperty("reservation_time"),
    isValidTime,
    bodyHasProperty("people"),
    isValidNumberOfPeople,
    asyncErrorBoundary(isValidStatus),
    asyncErrorBoundary(update),
  ],
};

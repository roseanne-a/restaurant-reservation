const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyHasProperty = require("../errors/bodyHasProperty");
const isValidTableName = require("../errors/isValidTableName");
const isValidCapacity = require("../errors/isValidCapacity");
const tableExists = require("../errors/tableExists");
const reservationExists = require("../errors/reservationExists");

async function list(req, res, next) {
  const table = await service.list();

  res.json({ data: table });
}

async function create(req, res, next) {
  const newTable = req.body.data;

  const table = await service.create(newTable);

  res.status(201).json({ data: table });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;

  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;

  if (people > capacity) {
    next({
      status: 400,
      message: `capacity should be an integer greater than 0`,
    });
  } else if (res.locals.table.reservation_id) {
    next({
      status: 400,
      message: `that table is currently occupied`,
    });
  } else {
    const updatedTable = await service.update(table_id, reservation_id);

    res.json({ data: updatedTable });
  }
}

async function removeReservation(req, res, next) {
  const { table_id } = req.params;

  const { table } = res.locals;

  if (!table.reservation_id) {
    next({
      status: 400,
      message: `Table ${table_id} is not occupied. Nothing was changed.`,
    });
  } else {
    const updatedTable = await service.removeReservation(table_id);

    res.json({ data: updatedTable });
  }
}

module.exports = {
  list,
  create: [
    bodyHasProperty("table_name"),
    isValidTableName,
    bodyHasProperty("capacity"),
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    bodyHasProperty("reservation_id"),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ],
  removeReservation: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(removeReservation),
  ],
};

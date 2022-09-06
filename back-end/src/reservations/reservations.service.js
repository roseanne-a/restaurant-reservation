const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function updateStatus(reservationId, status) {
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update({ status })
    .returning("*")
    .then((createdRecords) => createdRecords[0]);

  // return knex.transaction(function (trx) {
  //   return trx
  //     .update({ reservation_id: reservationId })
  //     .where({ table_id: tableId })
  //     .into("tables")
  //     .then(function () {
  //       return trx("reservations")
  //         .where({ reservation_id: reservationId })
  //         .update({ status: "seated" });
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // });
}

module.exports = {
  list,
  read,
  create,
  updateStatus,
};

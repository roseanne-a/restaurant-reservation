const knex = require("../db/connection");

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(tableId, reservationId) {
  // return knex("tables")
  //   .where({ table_id: tableId })
  //   .update({ reservation_id: reservationId })
  //   .returning("*");
  return knex.transaction(function (trx) {
    return trx
      .where({ reservation_id: reservationId })
      .update({ status: "seated" })
      .into("reservations")
      .then(function () {
        return trx("tables")
          .update({ reservation_id: reservationId })
          .where({ table_id: tableId })
          .returning("*")
          .then((createdRecords) => createdRecords[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

function removeReservation(tableId, reservationId) {
  // return knex("tables")
  //   .where({ table_id: tableId })
  //   .update({ reservation_id: null });

  return knex.transaction(function (trx) {
    return trx
      .where({ reservation_id: reservationId })
      .update({ status: "finished" })
      .into("reservations")
      .then(function () {
        return trx("tables")
          .update({ reservation_id: null })
          .where({ table_id: tableId })
          .returning("*")
          .then((createdRecords) => createdRecords[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

module.exports = { read, list, create, update, removeReservation };

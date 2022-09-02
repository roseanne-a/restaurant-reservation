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
  return knex("tables")
    .where({ table_id: tableId })
    .update({ reservation_id: reservationId })
    .returning("*");
}

module.exports = { read, list, create, update };

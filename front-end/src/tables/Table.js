import React from "react";

export default function Table({ table }) {
  return (
    <>
      <p>{table.table_name}</p>
      <p>{table.capacity}</p>
      <p id={`data-table-id-status=${table.table_id}`}>
        {table.reservation_id ? "Occupied" : "Free"}
      </p>
    </>
  );
}

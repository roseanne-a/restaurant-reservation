import React from "react";

export default function Table({ table, handleFinish }) {
  return (
    <>
      <p>{table.table_name}</p>
      <p>{table.capacity}</p>
      <div data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? "occupied" : "free"}
      </div>
      <p>
        {table.reservation_id ? (
          <button
            data-table-id-finish={`${table.table_id}`}
            type="button"
            onClick={() => handleFinish(table.table_id)}
          >
            Finish
          </button>
        ) : (
          ""
        )}
      </p>
    </>
  );
}

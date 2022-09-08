import React from "react";
import { useHistory } from "react-router";
import { removeReservation } from "../utils/api";

export default function Table({ table, tables, setTables }) {
  const history = useHistory();
  const handleFinish = async (tableId) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await removeReservation(tableId);
      history.go(0);
    } else {
      return;
    }
  };
  return (
    <tr>
      <th scope="row">{table.table_name}</th>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td>
        {table.reservation_id ? (
          <button
            className="btn btn-color"
            data-table-id-finish={`${table.table_id}`}
            type="button"
            onClick={() => handleFinish(table.table_id)}
          >
            Finish
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}

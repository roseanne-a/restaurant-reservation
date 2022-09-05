import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { getReservation, editTableReservation } from "../utils/api";
import classNames from "../utils/classNames";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat({ tables, setTables }) {
  const history = useHistory();

  const { reservation_id } = useParams();
  const initialOverCapacityState = {
    isError: false,
    errorMessage:
      "The amount of people in the party must not exceed the number of seats.",
  };
  const initialOccupiedError = {
    isError: false,
    errorMessage: "That table is already occupied.",
  };
  let errorExists = false;

  const [tablesError, setTablesError] = useState(null);
  const [tableId, setTableId] = useState("");
  const [reservation, setReservation] = useState({});
  const [reservationError, setReservationError] = useState(null);
  const [capacityError, setCapacityError] = useState({
    ...initialOverCapacityState,
  });
  const [occupiedError, setOccupiedError] = useState({
    ...initialOccupiedError,
  });

  useEffect(loadReservationAndTables, [reservation_id]);

  function loadReservationAndTables() {
    const abortController = new AbortController();
    setTablesError(null);
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);

    return () => abortController.abort();
  }

  const handleTableIdChange = (event) => {
    setTableId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    errorExists = false;
    setCapacityError({ ...initialOverCapacityState });
    setOccupiedError({ ...initialOccupiedError });

    let foundTable = tables.find((table) => table.table_id === Number(tableId));

    if (reservation.people > foundTable.capacity) {
      setCapacityError({ ...capacityError, isError: true });
      errorExists = true;
    }
    if (foundTable.reservation_id) {
      setOccupiedError({ ...occupiedError, isError: true });
      errorExists = true;
    }

    if (!errorExists) {
      editTableReservation(Number(tableId), reservation_id)
        .then(
          setTables(
            tables.map((table) =>
              table.table_id === Number(tableId)
                ? { ...table, reservation_id: reservation_id }
                : table
            )
          )
        )
        .then(setTableId(""))
        .then(
          history.push({
            pathname: `/dashboard`,
          })
        );
    }
  };

  return (
    <>
      <div
        className={classNames({
          "d-none": !capacityError.isError,
          alert: capacityError.isError,
          "alert-danger": capacityError.isError,
        })}
      >
        {capacityError.errorMessage}
      </div>
      <div
        className={classNames({
          "d-none": !occupiedError.isError,
          alert: occupiedError.isError,
          "alert-danger": occupiedError.isError,
        })}
      >
        {occupiedError.errorMessage}
      </div>
      <ErrorAlert error={reservationError} />
      <div>{`Assign Seat to reservation for ${reservation.people}`}</div>

      <ErrorAlert error={tablesError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">
          <select
            id="table_id"
            name="table_id"
            onChange={handleTableIdChange}
            value={tableId}
          >
            <option value="0">--- Select a table ---</option>
            {tables.map((table) => (
              <option
                value={table.table_id}
                key={table.table_id}
              >{`${table.table_name} - ${table.capacity}`}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import classNames from "../utils/classNames";

export default function TableForm({ tables, setTables }) {
  const history = useHistory();
  const initialCapacityStateError = {
    isError: false,
    errorMessage: "The amount of people in the party must be at least 1.",
  };
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [capacityError, setCapacityError] = useState({
    ...initialCapacityStateError,
  });

  const handleTableNameChange = (event) => setTableName(event.target.value);
  const handleCapacityChange = (event) => setCapacity(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCapacityError({ ...initialCapacityStateError });
    let capacityAsNumber = Number(capacity);

    if (capacityAsNumber === 0) {
      setCapacityError({ ...capacityError, isError: true });
    } else {
      createTable({ table_name: tableName, capacity: capacityAsNumber })
        .then((result) => setTables([...tables, result]))
        .then(setTableName(""))
        .then(setCapacity(""))
        .then(
          history.push({
            pathname: `/dashboard`,
          })
        );
    }
  };

  return (
    <>
      <h1>Table Form</h1>
      <div
        className={classNames({
          "d-none": !capacityError.isError,
          alert: capacityError.isError,
          "alert-danger": capacityError.isError,
        })}
      >
        {capacityError.errorMessage}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">
          Table name:
          <input
            id="table_name"
            type="text"
            name="table_name"
            minLength="2"
            onChange={handleTableNameChange}
            value={tableName}
            required
          />
        </label>
        <br />
        <label htmlFor="capacity">
          Capacity:
          <input
            id="capacity"
            type="number"
            name="capacity"
            onChange={handleCapacityChange}
            value={capacity}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </>
  );
}

import React from "react";
import { useHistory } from "react-router";
import { previous, next } from "../utils/date-time";

export default function DateNav({ date }) {
  const history = useHistory();

  return (
    <>
      <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>
        Previous
      </button>
      <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>
        Next
      </button>
    </>
  );
}

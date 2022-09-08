import React from "react";
import { useHistory } from "react-router";
import { previous, next } from "../utils/date-time";

export default function DateNav({ date }) {
  const history = useHistory();

  return (
    <div className="p-3">
      <button
        className="btn btn-color"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        &le;&le; {previous(date)}
      </button>
      <button
        className="btn btn-color"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        {next(date)} &gt;&gt;
      </button>
    </div>
  );
}

import React from "react";
import { useHistory } from "react-router";
import { updateReservationStatus } from "../utils/api";
import { formatAsStandardTime } from "../utils/date-time";
import "./Reservation.css";

export default function Reservation({
  reservation,
  reservations,
  setReservations,
}) {
  const history = useHistory();
  const handleCancel = async (reservation_id) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      setReservations(
        reservations.map((reservation) =>
          reservation.reservation_id === reservation_id
            ? { ...reservation, status: "cancelled" }
            : reservation
        )
      );
      await updateReservationStatus(reservation_id, "cancelled");
      history.go(0);
    } else {
      return;
    }
  };
  return (
    <div className="col mb-4">
      <div className="card card-bg text-white">
        <div className="card-body">
          <h5 className="card-title">
            {reservation.last_name}, {reservation.first_name}
          </h5>
          <p className="card-text">
            Reservation for:{" "}
            {formatAsStandardTime(reservation.reservation_time)}
          </p>
          <p>
            For <strong>{reservation.people}</strong>{" "}
            {reservation.people === 1 ? "person" : "people"}
          </p>
          <p>
            Currently{" "}
            <span data-reservation-id-status={`${reservation.reservation_id}`}>
              <strong>{reservation.status}</strong>
            </span>
          </p>
        </div>
        <div className="card-footer" aria-label="Edit Reservation">
          {reservation.status === "booked" ? (
            <>
              <a href={`/reservations/${reservation.reservation_id}/edit`}>
                <button type="button" className="btn btn-color">
                  Edit
                </button>
              </a>
              <a href={`/reservations/${reservation.reservation_id}/seat`}>
                <button type="button" className="btn btn-color">
                  Seat
                </button>
              </a>
            </>
          ) : (
            ""
          )}
          {reservation.status !== "cancelled" ? (
            <button
              type="button"
              className="btn btn-color"
              data-reservation-id-cancel={`${reservation.reservation_id}`}
              onClick={() => handleCancel(reservation.reservation_id)}
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

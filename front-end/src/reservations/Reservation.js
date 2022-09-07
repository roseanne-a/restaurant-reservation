import React from "react";
import { useHistory } from "react-router";
import { updateReservationStatus } from "../utils/api";

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
    <>
      <p>
        {reservation.last_name}, {reservation.first_name}
      </p>
      <p>
        {reservation.reservation_time} on {reservation.reservation_date}
      </p>
      <p>For {reservation.people} people/person</p>
      <p>
        Currently{" "}
        <span data-reservation-id-status={`${reservation.reservation_id}`}>
          {reservation.status}
        </span>
      </p>
      {reservation.status !== "cancelled" ? (
        <>
          <button
            type="button"
            data-reservation-id-cancel={`${reservation.reservation_id}`}
            onClick={() => handleCancel(reservation.reservation_id)}
          >
            Cancel
          </button>
          <br />
        </>
      ) : (
        ""
      )}

      {reservation.status === "booked" ? (
        <>
          <button type="button">
            <a href={`/reservations/${reservation.reservation_id}/edit`}>
              Edit
            </a>
          </button>
          <button type="button">
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              Seat
            </a>
          </button>
        </>
      ) : (
        ""
      )}
      <hr />
    </>
  );
}

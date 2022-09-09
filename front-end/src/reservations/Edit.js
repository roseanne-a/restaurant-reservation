import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { getReservation, editReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import ErrorAlert from "../layout/ErrorAlert";
import {
  isFutureDate,
  isNotTuesday,
  isDuringBusinessHours,
  isFutureTime,
} from "../utils/validDateAndTime";
import classNames from "../utils/classNames";
import ReservationForm from "./ReservationForm";
import { today, formatAsDate } from "../utils/date-time";

export default function Edit({ reservations, setReservations }) {
  const { reservation_id } = useParams();
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: 0,
  };

  const initialErrorState = {
    pastDateError: {
      isError: false,
      errorMessage:
        "Sorry, the reservation date and time must be in the future.",
    },
    tuesdayError: {
      isError: false,
      errorMessage: "Sorry, we are closed on Tuesdays.",
    },
    hoursError: {
      isError: false,
      errorMessage:
        "Sorry, the reservation time must be in the future, between 10:30AM and 9:30PM.",
    },
  };
  const [reservation, setReservation] = useState(initialFormState);
  useEffect(() => {
    function loadReservation() {
      const abortController = new AbortController();
      setReservationError(null);

      getReservation(reservation_id, abortController.signal)
        .then((reservation) => formatReservationDate(reservation))
        .then((result) => {
          setReservation(formatReservationTime(result));
        })
        .catch(setReservationError);

      return () => abortController.abort();
    }
    loadReservation();
  }, [reservation_id]);

  const [errors, setErrors] = useState({ ...initialErrorState });
  const [reservationError, setReservationError] = useState(null);

  let errorExists = false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorExists = false;
    setErrors({ ...initialErrorState });
    const { reservation_date, reservation_time } = reservation;

    if (!isFutureDate(reservation_date)) {
      setErrors((errors) => {
        return {
          ...errors,
          pastDateError: { ...errors.pastDateError, isError: true },
        };
      });
      errorExists = true;
    }
    if (!isNotTuesday(reservation_date)) {
      setErrors((errors) => {
        return {
          ...errors,
          tuesdayError: { ...errors.tuesdayError, isError: true },
        };
      });
      errorExists = true;
    }
    if (!isFutureTime(reservation_date, reservation_time)) {
      setErrors((errors) => {
        return {
          ...errors,
          pastDateError: { ...errors.pastDateError, isError: true },
        };
      });
      errorExists = true;
    }
    if (!isDuringBusinessHours(reservation_time)) {
      setErrors((errors) => {
        return {
          ...errors,
          hoursError: { ...errors.hoursError, isError: true },
        };
      });
      errorExists = true;
    }

    if (!errorExists) {
      reservation.people = Number(reservation.people);
      await editReservation(reservation_id, reservation);

      setReservations([
        ...reservations.map((currentReservation) =>
          currentReservation.reservation_id === reservation_id
            ? { ...currentReservation, reservation }
            : currentReservation
        ),
      ]);

      history.push({
        pathname: `/dashboard`,
        search: `?date=${formatAsDate(reservation_date)}`,
      });
    }
  };

  return (
    <section className="mb-5 d-flex flex-column">
      <h1>Edit Reservation</h1>
      <div className="container justify-content-center">
        <div
          className={classNames({
            "d-none": !errors.pastDateError.isError,
            alert: errors.pastDateError.isError,
            "alert-danger": errors.pastDateError.isError,
          })}
        >
          {errors.pastDateError.errorMessage}
        </div>

        <div
          className={classNames({
            "d-none": !errors.tuesdayError.isError,
            alert: errors.tuesdayError.isError,
            "alert-danger": errors.tuesdayError.isError,
          })}
        >
          {errors.tuesdayError.errorMessage}
        </div>
        <div
          className={classNames({
            "d-none": !errors.hoursError.isError,
            alert: errors.hoursError.isError,
            "alert-danger": errors.hoursError.isError,
          })}
        >
          {errors.hoursError.errorMessage}
        </div>
      </div>
      <ErrorAlert reservationError={reservationError} />
      <ReservationForm
        setReservationData={setReservation}
        reservationData={reservation}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}

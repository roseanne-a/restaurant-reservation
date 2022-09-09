import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import {
  isFutureDate,
  isNotTuesday,
  isDuringBusinessHours,
  isFutureTime,
} from "../utils/validDateAndTime";
import classNames from "../utils/classNames";
import { formatAsDate, today } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import { listReservations } from "../utils/api";

export default function Create({ reservations, setReservations }) {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: 0,
  };

  const [newReservation, setNewReservation] = useState(initialFormState);

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

  const [errors, setErrors] = useState({ ...initialErrorState });
  let errorExists = false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorExists = false;
    setErrors({ ...initialErrorState });
    const { reservation_date, reservation_time } = newReservation;

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
      let dateFormatted = formatAsDate(reservation_date);
      newReservation.people = Number(newReservation.people);
      try {
        const createdReservation = await createReservation(newReservation);
        setReservations([...reservations, createdReservation]);
        setNewReservation({ ...initialFormState });
      } catch (e) {
        console.log(e);
      }

      history.push({
        pathname: `/dashboard`,
        search: `?date=${dateFormatted}`,
      });
    }
  };

  return (
    <section className="mb-5 d-flex flex-column">
      <h1>Create Reservation</h1>
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

      <ReservationForm
        reservationData={newReservation}
        setReservationData={setNewReservation}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}

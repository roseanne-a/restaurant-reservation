import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { today } from "../utils/date-time";
import classNames from "../utils/classNames";
import isFutureDate from "../utils/validation/isFutureDate";
import isNotTuesday from "../utils/validation/isNotTuesday";

function ReservationForm() {
  const history = useHistory();
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
  };
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState({ ...initialErrorState });
  let errorExists = false;

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    errorExists = false;
    setErrors({ ...initialErrorState });
    const { reservation_date } = formData;

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
    if (!errorExists) {
      formData.people = Number(formData.people);
      createReservation(formData)
        .then(setFormData({ ...initialFormState }))
        .then(history.push(`/dashboard?date=${reservation_date}`));
    }
  };

  return (
    <>
      <h1>New Reservation</h1>

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

      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First name:
          <input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
        </label>
        <br />
        <label htmlFor="last_name">
          Last name:
          <input
            id="last_name"
            type="text"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
        </label>
        <br />
        <label htmlFor="mobile_number">
          Mobile number:
          <input
            id="mobile_number"
            type="text"
            name="mobile_number"
            placeholder="XXX-XXX-XXXX"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </label>
        <br />
        <label htmlFor="reservation_date">
          Date of reservation:
          <input
            id="reservation_date"
            type="date"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </label>
        <br />
        <label htmlFor="reservation_time">
          Time of reservation:
          <input
            id="reservation_time"
            type="time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </label>
        <br />
        <label htmlFor="people">
          Number of people:
          <input
            id="people"
            type="number"
            name="people"
            onChange={handleChange}
            value={formData.people}
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

export default ReservationForm;

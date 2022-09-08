import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({
  reservationData,
  setReservationData,
  handleSubmit,
}) {
  const history = useHistory();
  const handleChange = ({ target }) => {
    setReservationData({
      ...reservationData,
      [target.name]: target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group d-flex flex-column justify-content-center">
        <label htmlFor="first_name">
          First name:
          <input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={reservationData.first_name}
            required
            className="form-control"
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
            value={reservationData.last_name}
            required
            className="form-control"
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
            value={reservationData.mobile_number}
            required
            className="form-control"
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
            value={reservationData.reservation_date}
            required
            className="form-control"
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
            value={reservationData.reservation_time}
            required
            className="form-control"
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
            value={reservationData.people}
            required
            className="form-control"
            min="1"
          />
        </label>
      </div>
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.goBack()}
      >
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;

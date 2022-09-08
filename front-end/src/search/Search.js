import React, { useState } from "react";
import { listReservations } from "../utils/api";
import Reservation from "../reservations/Reservation";

export default function Search() {
  const [mobile_number, setMobileNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState("");

  const changeHandler = (event) => setMobileNumber(event.target.value);

  const searchHandler = async (event) => {
    event.preventDefault();
    setSearchResults([]);
    let results = await listReservations({ mobile_number });

    if (results.length === 0 || !results) {
      setNoResults("No reservations found");
    } else setSearchResults([...results]);
  };

  return (
    <section className="container">
      <form onSubmit={searchHandler}>
        <div className="form-group text-center">
          <label htmlFor="search">
            <input
              id="mobile_number"
              name="mobile_number"
              value={mobile_number}
              placeholder="Enter a customer's phone number"
              onChange={changeHandler}
              className="form-control"
              size="100"
            />
            <button
              type="submit"
              onClick={searchHandler}
              class="form-control btn btn-color"
            >
              Find
            </button>
          </label>
        </div>
      </form>

      <hr />
      <h1 className="text-center">Search Results</h1>
      <div className="row row-cols-1 row-cols-md-4">
        {searchResults.length > 0
          ? searchResults.map((reservation) => (
              <Reservation
                key={reservation.reservation_id}
                reservation={reservation}
              />
            ))
          : noResults}
      </div>
    </section>
  );
}

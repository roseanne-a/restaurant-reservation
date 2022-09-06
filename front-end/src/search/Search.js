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
    <>
      <form onSubmit={searchHandler}>
        <label htmlFor="search">
          <input
            id="mobile_number"
            name="mobile_number"
            value={mobile_number}
            placeholder="Enter a customer's phone number"
            onChange={changeHandler}
          />
          <button type="submit" onClick={searchHandler}>
            Find
          </button>
        </label>
      </form>
      <hr />
      <h1>Search Results</h1>
      {searchResults.length > 0
        ? searchResults.map((reservation) => (
            <Reservation
              key={reservation.reservation_id}
              reservation={reservation}
            />
          ))
        : noResults}
    </>
  );
}

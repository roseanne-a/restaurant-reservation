import React from "react";

import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Create from "./Create";
import Edit from "./Edit";
import Seat from "./Seat";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Reservations({ reservations, setReservations, tables }) {
  return (
    <Switch>
      <Route path="/reservations/new">
        <Create setReservations={setReservations} reservations={reservations} />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <Edit reservations={reservations} setReservations={setReservations} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seat tables={tables} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Reservations;

import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import ReservationForm from "../reservations/ReservationForm";
import { today } from "../utils/date-time";
import TableForm from "../tables/TableForm";
import Seat from "../reservations/Seat";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const query = useQuery();
  let dateQuery = query.get("date");
  let date = today();
  if (dateQuery) date = dateQuery;

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function loadTables() {
      const newTables = await listTables();
      setTables(newTables);
    }
    loadTables();
  }, []);

  useEffect(() => {
    async function loadReservations() {
      const newReservations = await listReservations({ date });
      setReservations(newReservations);
    }
    loadReservations();
  }, [date]);

  // function loadDashboard({reservations, tables}) {
  //   console.log("loaded");
  //   const abortController = new AbortController();
  //   setReservationsError(null);
  //   setTablesError(null);
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError);
  //   listTables(abortController.signal).then(setTables).catch(setTablesError);
  //   return () => abortController.abort();
  // }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <ReservationForm />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seat
          reservations={reservations}
          tables={tables}
          setReservations={setReservations}
          setTables={setTables}
        />
      </Route>
      <Route path="/tables/new">
        <TableForm
          reservations={reservations}
          tables={tables}
          setReservations={setReservations}
          setTables={setTables}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          reservations={reservations}
          tables={tables}
          setReservations={setReservations}
          setTables={setTables}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;

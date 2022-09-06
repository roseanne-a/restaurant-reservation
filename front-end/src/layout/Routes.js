import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import ReservationForm from "../reservations/ReservationForm";
import Seat from "../reservations/Seat";
import Search from "../search/Search";
import { today } from "../utils/date-time";
import TableForm from "../tables/TableForm";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  //const history = useHistory();
  const query = useQuery();
  let dateQuery = query.get("date");
  let date = today();
  if (dateQuery) date = dateQuery;

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function loadReservationsAndTables() {
      const newReservations = await listReservations({ date });
      const newTables = await listTables();
      setReservations([...newReservations]);
      setTables([...newTables]);
    }
    loadReservationsAndTables();
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
        <ReservationForm
          setReservations={setReservations}
          reservations={reservations}
        />
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
          date={date}
          reservations={reservations}
          tables={tables}
          setReservations={setReservations}
          setTables={setTables}
        />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;

//import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../reservations/Reservation";
import Table from "../tables/Table";
import DateNav from "../reservations/DateNav";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, tables, setTables, setReservations }) {
  return (
    <>
      <h1 className="text-center">Dashboard</h1>
      <section>
        <div className="text-center mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        {/* <ErrorAlert error={reservationsError} /> */}

        {reservations.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-4">
            {reservations.map((reservation) => (
              <Reservation
                key={reservation.reservation_id}
                reservation={reservation}
                reservations={reservations}
                setReservations={setReservations}
              />
            ))}{" "}
          </div>
        ) : (
          <div className="container-fluid text-center">
            <h2>No reservations for this date.</h2>
          </div>
        )}
      </section>
      <nav className="text-center">
        <DateNav date={date} />
      </nav>
      <section>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">All Tables</h4>
        </div>
        {/* <ErrorAlert error={tablesError} /> */}
        <table className="table table-color">
          <thead>
            <tr>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col">Finish</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <Table
                key={table.table_id}
                table={table}
                tables={tables}
                setTables={setTables}
              />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Dashboard;

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
    <main>
      <h1>Dashboard</h1>
      <section>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
        </div>
        {/* <ErrorAlert error={reservationsError} /> */}
        {reservations.map((reservation) => (
          <Reservation
            key={reservation.reservation_id}
            reservation={reservation}
            reservations={reservations}
            setReservations={setReservations}
          />
        ))}
      </section>
      <nav>
        <DateNav date={date} />
      </nav>
      <section>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">All Tables</h4>
        </div>
        {/* <ErrorAlert error={tablesError} /> */}
        {tables.map((table) => (
          <Table
            key={table.table_id}
            table={table}
            tables={tables}
            setTables={setTables}
            // handleFinish={handleFinish}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;

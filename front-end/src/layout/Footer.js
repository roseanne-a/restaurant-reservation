import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <Link className="nav-link" to="/credits">
        Credits
      </Link>
    </div>
  );
}

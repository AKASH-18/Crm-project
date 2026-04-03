import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo">
        <h2 className="">CanovaCRM</h2>
      </div>

      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Dashboard
        </Link>

        <Link
          to="/employees"
          className={location.pathname === "/employees" ? "active" : ""}
        >
          Employees
        </Link>

        <Link
          to="/leads"
          className={location.pathname === "/leads" ? "active" : ""}
        >
          Leads
        </Link>

        <Link
          to="/settings"
          className={location.pathname === "/settings" ? "active" : ""}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;

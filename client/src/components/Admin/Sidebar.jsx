import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* LOGO */}
      <h2 className="logo">Canova<span>CRM</span></h2>

      {/* MENU */}
      <div
        className={location.pathname === "/" ? "active" : ""}
        onClick={() => navigate("/")}
      >
        Dashboard
      </div>

      <div
        className={location.pathname === "/leads" ? "active" : ""}
        onClick={() => navigate("/leads")}
      >
        Leads
      </div>

      <div
        className={location.pathname === "/employees" ? "active" : ""}
        onClick={() => navigate("/employees")}
      >
        Employees
      </div>
      <div
        className={location.pathname === "/settings" ? "active" : ""}
        onClick={() => navigate("/settings")}
      >
        Settings
      </div>
    </div>
  );
}

export default Sidebar;

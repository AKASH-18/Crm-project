import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Employee/layout.css";

function EmployeeLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data");
  }

  const path = location.pathname;

  let headerTitle = "";

  if (path === "/employee-dashboard") {
    headerTitle = (
      <div className="dashboard-header">
        <p>Good Morning</p>
        <h3>{user?.name || "Employee"}</h3>
      </div>
    );
  } else if (path === "/employee-leads") {
    headerTitle = "Leads";
  } else if (path === "/employee-schedule") {
    headerTitle = "Schedule";
  } else if (path === "/employee-profile") {
    headerTitle = "Profile";
  }

  return (
    <div className="mobile-container">
      {/* 🔝 TOP HEADER */}
      <div className="top-bar">
        <div className="header-top">
          <h2>
            Canova<span>CRM</span>
          </h2>
        </div>

        <div className="path">
          <h2>{headerTitle}</h2>
        </div>
      </div>

      {/* 📱 PAGE CONTENT */}
      <div className="page-content">{children}</div>

      {/* 🔻 BOTTOM NAV */}
      <div className="bottom-bar">
        <div
          className={
            path === "/employee-dashboard" ? "nav-item active" : "nav-item"
          }
          onClick={() => navigate("/employee-dashboard")}
        >
          <span>
            <img src="../../assets/employee/chart-2.png" alt="" />
          </span>
          <p>Home</p>
        </div>

        <div
          className={
            path === "/employee-leads" ? "nav-item active" : "nav-item"
          }
          onClick={() => navigate("/employee-leads")}
        >
          <span>
            {" "}
            <img src="../../assets/employee/vector.png" alt="" />
          </span>
          <p>Leads</p>
        </div>

        <div
          className={
            path === "/employee-schedule" ? "nav-item active" : "nav-item"
          }
          onClick={() => navigate("/employee-schedule")}
        >
          <span>
            {" "}
            <img src="../../assets/employee/calendar-line 1.png" alt="" />
          </span>
          <p>Schedule</p>
        </div>

        <div
          className={
            path === "/employee-profile" ? "nav-item active" : "nav-item"
          }
          onClick={() => navigate("/employee-profile")}
        >
          <span>
            {" "}
            <img src="../../assets/employee/vector (1).png" alt="" />
          </span>
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLayout;

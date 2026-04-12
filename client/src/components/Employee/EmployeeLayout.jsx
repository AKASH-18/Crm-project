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
      <>
        <p>Good Morning</p>
        <br />
        {user?.name || "Employee"}
      </>
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
            path === "/employee-dashboard"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() => navigate("/employee-dashboard")}
        >
          <span>🏠</span>
          <p>Home</p>
        </div>

        <div
          className={
            path === "/employee-leads"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() => navigate("/employee-leads")}
        >
          <span>📋</span>
          <p>Leads</p>
        </div>

        <div
          className={
            path === "/employee-schedule"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() => navigate("/employee-schedule")}
        >
          <span>📅</span>
          <p>Schedule</p>
        </div>

        <div
          className={
            path === "/employee-profile"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() => navigate("/employee-profile")}
        >
          <span>👤</span>
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLayout;
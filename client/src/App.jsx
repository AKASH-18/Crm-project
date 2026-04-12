import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./styles/global.css";
import "./styles/variables.css";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";

import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Leads from "./pages/admin/Leads";
import Settings from "./pages/admin/Settings";
import EmployeeHome from "./pages/Employee/EmployeeHome";
import EmployeeLeads from "./pages/Employee/EmployeeLeads";
import EmployeeSchedule from "./pages/Employee/EmployeeSchedule";
import EmployeeProfile from "./pages/Employee/EmployeeProfile";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Landing */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/employee-dashboard" />
              )
            ) : (
              <Landing />
            )
          }
        />

        {/* 🔐 Login */}
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />
        <Route
          path="/employee-login"
          element={<EmployeeLogin setUser={setUser} />}
        />

        {/* 👑 ADMIN ROUTES */}
        <Route
          path="/dashboard"
          element={user?.role === "admin" ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/employees"
          element={user?.role === "admin" ? <Employees /> : <Navigate to="/" />}
        />
        <Route
          path="/leads"
          element={user?.role === "admin" ? <Leads /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={user?.role === "admin" ? <Settings /> : <Navigate to="/" />}
        />

        {/* 👨‍💼 EMPLOYEE ROUTE (🔥 FIXED) */}
        <Route
          path="/employee-dashboard"
          element={
            user?.role === "user" ? <EmployeeHome /> : <Navigate to="/" />
          }
        />

        <Route
          path="/employee-leads"
          element={
            user?.role === "user" ? <EmployeeLeads /> : <Navigate to="/" />
          }
        />

        <Route
          path="/employee-schedule"
          element={
            user?.role === "user" ? <EmployeeSchedule /> : <Navigate to="/" />
          }
        />

        <Route
          path="/employee-profile"
          element={
            user?.role === "user" ? <EmployeeProfile /> : <Navigate to="/" />
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

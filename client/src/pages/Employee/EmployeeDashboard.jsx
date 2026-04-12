import EmployeeLayout from "../../components/Employee/EmployeeLayout";

function EmployeeDashboard() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data in localStorage");
  }

  return (
    <EmployeeLayout>
      <div>
        <h3>Welcome back, {user?.name || "User"}</h3>

        {/* QUICK STATS */}
        <div className="stats">
          <div className="stat-card">
            <p>Active Leads</p>
            <h2>12</h2>
          </div>

          <div className="stat-card">
            <p>Scheduled</p>
            <h2>4</h2>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;

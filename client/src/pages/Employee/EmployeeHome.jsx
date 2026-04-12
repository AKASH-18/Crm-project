import EmployeeLayout from "../../components/Employee/EmployeeLayout";


function EmployeeHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <EmployeeLayout title="">
      
      {/* 🔵 HEADER DESIGN */}
      <div className="home-header">
        <h2>Canova<span>CRM</span></h2>
        <p>Good Morning</p>
        <h3>{user.name}</h3>
      </div>

      {/* ⏱ TIMINGS */}
      <div className="section">
        <h4>Timings</h4>

        <div className="timing-card">
          <div>
            <p>Check in</p>
            <span>--:--</span>
          </div>
          <div>
            <p>Check Out</p>
            <span>--:--</span>
          </div>
        </div>

        <div className="timing-card">
          <div>
            <p>Break</p>
            <span>--:--</span>
          </div>
          <div>
            <p>Ended</p>
            <span>--:--</span>
          </div>
        </div>

        {/* HISTORY */}
        <div className="timing-history">
          <p>Break 01:25 pm | Ended 02:15 pm | Date 10/04/25</p>
          <p>Break 01:00 pm | Ended 02:05 pm | Date 09/04/25</p>
          <p>Break 01:05 pm | Ended 02:30 pm | Date 08/04/25</p>
        </div>
      </div>

      {/* 📊 ACTIVITY */}
      <div className="section">
        <h4>Recent Activity</h4>

        <div className="activity-box">
          <ul>
            <li>You were assigned 3 more new lead - 1 hour ago</li>
            <li>You Closed a deal today - 2 hours ago</li>
          </ul>
        </div>
      </div>

    </EmployeeLayout>
  );
}

export default EmployeeHome;
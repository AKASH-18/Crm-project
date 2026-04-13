import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import { useEffect, useState } from "react";
import API from "../../api";
import "../../styles/Employee/dashboard.css";

function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [log, setLog] = useState({});
  const [activities, setActivities] = useState([]);

  // ✅ FETCH DATA
  const fetchData = async () => {
    const res = await API.get(`/time/${user._id}`);
    setLog(res.data || {});

    const leads = await API.get(`/leads/my/${user._id}`);

    const activity = leads.data.slice(0, 3).map((l) => {
      if (l.status === "Closed") {
        return `You closed a deal - ${l.name}`;
      }
      return `You were assigned a new lead - ${l.name}`;
    });

    setActivities(activity);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ CHECK IN / OUT
  const handleCheck = async () => {
    await API.post("/time/check", { userId: user._id });
    fetchData();
  };

  // ✅ BREAK
  const handleBreak = async () => {
    await API.post("/time/break", { userId: user._id });
    fetchData();
  };

  return (
    <EmployeeLayout title="">
      <div className="dashboard">
        {/* CHECK IN */}
        <div className="card blue">
          <div>
            <p>Checked-In</p>
            <h3>{log?.checkIn || "--:--"}</h3>
          </div>

          <div>
            <p>Check Out</p>
            <h3>{log?.checkOut || "--:--"}</h3>
          </div>

          <button onClick={handleCheck} className="action-btn">
            {log?.checkOut ? "Done" : log?.checkIn ? "Check Out" : "Check In"}
          </button>
        </div>

        {/* BREAK */}
        <div className="card blue">
          <div>
            <p>Break</p>
            <h3>
              {log?.breaks?.length > 0 &&
              !log.breaks[log.breaks.length - 1]?.end
                ? log.breaks[log.breaks.length - 1].start
                : "--:--"}
            </h3>
          </div>

          <div>
            <p>Ended</p>
            <h3>
              {log?.breaks?.length > 0 &&
                log.breaks[log.breaks.length - 1]?.end}
            </h3>
          </div>

          <button onClick={handleBreak} className="action-btn">
            Take Break
          </button>
        </div>

        {/* BREAK TABLE */}
        <div className="break-table">
          {log?.breaks?.map((b, i) => (
            <div key={i} className="row">
              <span>Break {b.start}</span>
              <span>Ended {b.end || "--"}</span>
              <span>Date {b.date}</span>
            </div>
          ))}
        </div>

        {/* ACTIVITY */}
        <div className="activity">
          <h4>Recent Activity</h4>

          {activities.map((a, i) => (
            <p key={i}>• {a}</p>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;

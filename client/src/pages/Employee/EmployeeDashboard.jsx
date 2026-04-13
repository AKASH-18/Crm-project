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
        <h3> Timing </h3>
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

          <button
            onClick={handleCheck}
            className={`action-btn ${
              !log?.checkIn ? "red" : log?.checkOut ? "green" : "red"
            }`}
          >
            {!log?.checkIn ? "Check In" : log?.checkOut ? "Done" : "Check Out"}
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

          <button
            onClick={handleBreak}
            className={`action-btn ${
              log?.breaks?.length > 0 && !log.breaks[log.breaks.length - 1]?.end
                ? "red"
                : "green"
            }`}
          >
            Break
          </button>
        </div>
        <div className="break-tablediv">
          {/* BREAK TABLE */}
          <table className="break-table">
            <thead>
              <tr>
                <th>Break</th>
                <th>Ended</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {[...Array(4)].map((_, i) => {
                const b = log?.breaks?.[i];

                return (
                  <tr key={i}>
                    <td>{b?.start || "--:--"}</td>
                    <td>{b?.end || "--:--"}</td>
                    <td>{b?.date || "--/--/----"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ACTIVITY */}
        <div className="activity">
          <h4>Recent Activity</h4>
          <div className="recent-activityfeed">
            {activities.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;

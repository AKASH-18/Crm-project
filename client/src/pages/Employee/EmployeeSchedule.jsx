import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import { useEffect, useState } from "react";
import "../../styles/Employee/schedule.css";
import API from "../../api";

function EmployeeSchedule() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data");
  }

  // ✅ FETCH SCHEDULED LEADS
 const fetchSchedule = async () => {
    try {
      if (!user?._id) return;

      const res = await API.get(`/leads/schedule/${user._id}`); 
      setLeads(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);


  // ✅ FILTER LOGIC
  const today = new Date().toISOString().split("T")[0];

  const filteredLeads =
    filter === "today"
      ? leads.filter((l) => {
          if (!l.scheduledDate) return false;
          return l.scheduledDate.split(" ")[0] === today;
        })
      : leads;

  return (
    <EmployeeLayout title="Schedule">
      <div className="schedule-top">
        <input className="search" placeholder="Search" />

        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          ⚙️
        </button>

        {showFilter && (
          <div className="filter-popup">
            <h4>Filter</h4>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="all">All</option>
            </select>

            <button onClick={() => setShowFilter(false)}>Save</button>
          </div>
        )}
      </div>

      <div className="schedule-cards">
        {filteredLeads.map((lead, index) => (
          <div
            key={lead._id}
            className={`schedule-card ${index === 0 ? "active" : ""}`}
          >
            <div className="row">
              <h4>{lead.source}</h4>
              <span>
                {lead.scheduledDate
                  ? lead.scheduledDate.split(" ")[0]
                  : ""}
              </span>
            </div>

            <div className="row">
              <p>{lead.phone || lead.email}</p>
            </div>

            <div className="row small">
              <p>📍 Call</p>
            </div>

            <div className="row user">
              <p>👤 {lead.name}</p>
            </div>
          </div>
        ))}
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeSchedule;
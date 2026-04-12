import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Employee/schedule.css";

function EmployeeSchedule() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FETCH SCHEDULED LEADS
  const fetchSchedule = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/leads/schedule/${user._id}`,
      );
      setLeads(res.data);
    } catch (err) {
      console.log(err);
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
      {/* 🔍 SEARCH + FILTER */}
      <div className="schedule-top">
        <input className="search" placeholder="Search" />

        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          ⚙️
        </button>

        {/* 🔥 FILTER POPUP */}
        {showFilter && (
          <div className="filter-popup">
            <h4>Filter</h4>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="today">Today</option>
              <option value="all">All</option>
            </select>

            <button onClick={() => setShowFilter(false)}>Save</button>
          </div>
        )}
      </div>

      {/* 📋 CARDS */}
      <div className="schedule-cards">
        {filteredLeads.map((lead, index) => (
          <div
            key={lead._id}
            className={`schedule-card ${index === 0 ? "active" : ""}`}
          >
            {/* TOP */}
            <div className="row">
              <h4>{lead.source}</h4>
              <span>
                {lead.scheduledDate ? lead.scheduledDate.split(" ")[0] : ""}
              </span>
            </div>

            {/* PHONE */}
            <div className="row">
              <p>{lead.phone || lead.email}</p>
            </div>

            {/* CALL */}
            <div className="row small">
              <p>📍 Call</p>
            </div>

            {/* USER */}
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

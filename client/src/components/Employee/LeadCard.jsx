import { useState } from "react";
import "../../styles/employee/leads.css";
import API from "../../api";
function LeadCard({ lead, refresh }) {
  const [type, setType] = useState(lead.type || "");
  const [status, setStatus] = useState(lead.status);
  const [date, setDate] = useState("");
  const [showDate, setShowDate] = useState(false);

  // 🔥 UPDATE FUNCTION
  const updateLead = async (data) => {
    try {
      console.log("SENDING:", data);

      await API.put(`/leads/${lead._id}`, data);

      refresh();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  return (
    <div className="lead-item">
      {/* LEFT */}
      <div className="lead-left">
        <h4>{lead.name}</h4>
        <p>{lead.email}</p>
        <span>{lead.date}</span>
      </div>

      {/* STATUS */}
      <div className={`status-circle ${status?.toLowerCase()}`}>{status}</div>

      {/* ACTION BUTTONS */}
      <div className="action-row">
        {/* TYPE */}
        <div className="select-with-icon">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              updateLead({ type: e.target.value });
            }}
          >
            <option value="">Type</option>
            <option value="Hot">Hot</option>
            <option value="Warm">Warm</option>
            <option value="Cold">Cold</option>
          </select>
        </div>

        {/* DATE */}
        <button onClick={() => setShowDate(!showDate)}></button>

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => {
            if (lead.scheduledDate && e.target.value === "Closed") {
              alert("Cannot close scheduled lead");
              return;
            }

            setStatus(e.target.value);
            updateLead({ status: e.target.value });
          }}
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* DATE INPUT */}
      {showDate && (
        <div className="date-box">
          <input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={() => {
              if (!date) {
                alert("Select date & time");
                return;
              }

              updateLead({
                scheduledDate: date,
                type: "Scheduled",
              });

              setShowDate(false);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default LeadCard;

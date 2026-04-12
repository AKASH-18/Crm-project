import { useState } from "react";
import axios from "axios";

function LeadCard({ lead, refresh }) {
  const [type, setType] = useState(lead.type || "");
  const [status, setStatus] = useState(lead.status);
  const [date, setDate] = useState("");
  const [showDate, setShowDate] = useState(false);

  // 🔥 UPDATE FUNCTION
 const updateLead = async (data) => {
  console.log("SENDING:", data);

  await axios.put(`http://localhost:5000/leads/${lead._id}`, data);

  refresh();
};

  return (
    <div className="lead-item">
      {/* LEFT */}
      <div className="lead-left">
        <h4>{lead.name}</h4>
        <p>{lead.email}</p>
        <span>{lead.date}</span>
      </div>

      {/* STATUS CIRCLE */}
      <div className={`status-circle ${status.toLowerCase()}`}>{status}</div>

      {/* 🔥 ACTION BUTTONS */}
      <div className="action-row">
        {/* 1️⃣ TYPE */}
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

        {/* 2️⃣ DATE */}
        <button onClick={() => setShowDate(!showDate)}>📅</button>

        {/* 3️⃣ STATUS */}
        <select
          value={status}
          onChange={(e) => {
            // ❌ Prevent closing if scheduled
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

      {/* 📅 DATE INPUT */}
      {showDate && (
        <div className="date-box">
          <input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={() => {
              console.log("SAVING DATE:", date); // debug

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

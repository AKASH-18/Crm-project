import { useState } from "react";
import axios from "axios";
import "../../src/styles/leads.css";

function LeadRow({ lead, refresh }) {
  const [type, setType] = useState(lead.type || "");
  const [scheduledDate, setScheduledDate] = useState("");

  const updateLead = async () => {
    await axios.put(`http://localhost:5000/leads/${lead._id}`, {
      type,
      scheduledDate,
    });

    refresh();
  };

  return (
    <tr>
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.source}</td>
      <td>{lead.date}</td>
      <td>{lead.location}</td>
      <td>{lead.language}</td>

      {/* 🔥 Status Dropdown */}
      <td>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select</option>
          <option value="Hot">Hot</option>
          <option value="Warm">Warm</option>
          <option value="Cold">Cold</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </td>

      {/* 📅 Scheduled Date */}
      <td>
        {type === "Scheduled" && (
          <input
            type="date"
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        )}

        <button onClick={updateLead}>Save</button>
      </td>
    </tr>
  );
}

export default LeadRow;

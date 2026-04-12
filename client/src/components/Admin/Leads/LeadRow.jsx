import { useState } from "react";
import axios from "axios";
import "../../../styles/admin/employees.css";

function LeadRow({ lead, refresh }) {
  const [type, setType] = useState(lead.type || "");
  const [scheduledDate, setScheduledDate] = useState(lead.scheduledDate || "");

  const updateLead = async () => {
    try {
      await axios.put(`http://localhost:5000/leads/${lead._id}`, {
        type,
        scheduledDate,
      });

      refresh(); // 🔥 reload table
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  return (
    <tr className="data-row">
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.source}</td>
      <td>{lead.date}</td>
      <td>{lead.location}</td>
      <td>{lead.language}</td>

      {/* ✅ Assigned To */}
      <td>{lead.assignedTo || "Unassigned"}</td>

      {/* ✅ Status */}
      <td>{lead.status}</td>

      {/* 🔥 Type Dropdown */}
      <td>{lead.type || "Warm"}</td>

      {/* 🔥 Action */}
      <td>{lead.scheduledDate || "--"}</td>
    </tr>
  );
}

export default LeadRow;

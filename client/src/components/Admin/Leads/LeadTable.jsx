import LeadRow from "./LeadRow";
import "../../../styles/admin/employees.css";

function LeadTable({ leads, refresh }) {
  return (
    <table className="lead-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Source</th>
          <th>Date</th>
          <th>Location</th>
          <th>Language</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Type</th>
          <th>ScheduleDate</th>
        </tr>
      </thead>

      <tbody>
        {leads.length === 0 ? (
          <tr>
            <td colSpan="10">No leads found</td>
          </tr>
        ) : (
          leads.map((lead) => (
            <LeadRow key={lead._id} lead={lead} refresh={refresh} />
          ))
        )}
      </tbody>
    </table>
  );
}

export default LeadTable;

import LeadRow from "./LeadRow";

function LeadTable({ leads, refresh }) {
  return (
    <table style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Source</th>
          <th>Date</th>
          <th>Location</th>
          <th>Language</th>
          <th>Status</th>
          <th>Assigned To</th>
        </tr>
      </thead>

      <tbody>
        {Array.isArray(leads) &&
          leads.map((lead) => (
            <LeadRow key={lead._id} lead={lead} refresh={refresh} />
          ))}
      </tbody>
    </table>
  );
}

export default LeadTable;

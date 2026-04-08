import "/src/styles/leads.css";

<table className="lead-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Source</th>
      <th>Location</th>
      <th>Language</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {leads.map((lead) => (
      <tr key={lead._id}>
        <td>{lead.name}</td>
        <td>{lead.email}</td>
        <td>{lead.source}</td>
        <td>{lead.location}</td>
        <td>{lead.language}</td>
        <td>
          <span className="status-badge">{lead.status}</span>
        </td>
      </tr>
    ))}
  </tbody>
</table>;

export default LeadTable;

import "/src/styles/leads.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import CSVUpload from "../components/CSVUpload";

function Leads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CSVUpload refresh={fetchLeads} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Location</th>
            <th>Language</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Leads;

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import LeadTable from "../components/LeadTable";
import CSVUpload from "../components/CSVUpload";

function Leads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = () => {
    axios
      .get("http://localhost:5000/leads")
      .then((res) => {
        setLeads(res.data.data || res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Leads</h2>

        {/* 🔥 CSV Upload */}
        <CSVUpload refresh={fetchLeads} />
      </div>

      <LeadTable leads={leads} refresh={fetchLeads} />
    </Layout>
  );
}

export default Leads;

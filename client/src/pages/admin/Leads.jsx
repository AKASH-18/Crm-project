import { useEffect, useState } from "react";
import CSVUpload from "../../components/Admin/Leads/CSVUpload";
import Layout from "../../components/Admin/Layout";
import LeadTable from "../../components/Admin/Leads/LeadTable";
import "../../styles/admin/leads.css";
import API from "../../api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [showManual, setShowManual] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 8;

  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    date: "",
    location: "",
    language: "",
  });

  // ✅ FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await API.get("/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/api/leads", form);
      setShowManual(false);
      fetchLeads();
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
  };

  return (
    <Layout>
      {(search) => {
        const filteredLeads = leads.filter(
          (lead) =>
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.email.toLowerCase().includes(search.toLowerCase())
        );

        const indexOfLastLead = currentPage * leadsPerPage;
        const indexOfFirstLead = indexOfLastLead - leadsPerPage;

        const currentLeads = filteredLeads.slice(
          indexOfFirstLead,
          indexOfLastLead
        );

        const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2>Leads</h2>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setShowManual(true)}>
                  Add Manually
                </button>

                <CSVUpload onUploadSuccess={fetchLeads} />
              </div>
            </div>

            <LeadTable leads={currentLeads} refresh={fetchLeads} />

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    className={currentPage === num ? "active-page" : ""}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>

            {showManual && (
              <div style={overlay}>
                <div style={modal}>
                  <h3>Add New Lead</h3>

                  <input name="name" placeholder="Name" onChange={handleChange} />
                  <input name="email" placeholder="Email" onChange={handleChange} />
                  <input name="source" placeholder="Source" onChange={handleChange} />
                  <input name="date" placeholder="Date" onChange={handleChange} />
                  <input name="location" placeholder="Location" onChange={handleChange} />
                  <input name="language" placeholder="Preferred Language" onChange={handleChange} />

                  <div style={{ marginTop: "10px" }}>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={() => setShowManual(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Layout>
  );
}

export default Leads;

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: "20px",
  width: "400px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
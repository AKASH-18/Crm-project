import "/src/styles/leads.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CSVUpload from "../components/Leads/CSVUpload";
import Layout from "../components/Layout";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [showManual, setShowManual] = useState(false);

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
      const res = await axios.get("http://localhost:5000/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ HANDLE FORM INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD MANUAL LEAD
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/leads", form);
      setShowManual(false);
      fetchLeads(); // refresh table
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div>
        {/* 🔥 HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>Leads</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setShowManual(true)}>Add Manually</button>

            {/* ✅ USING YOUR EXISTING CSV COMPONENT */}
            <CSVUpload onUploadSuccess={fetchLeads} />
          </div>
        </div>

        {/* 🔥 TABLE */}
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Date</th>
              <th>Location</th>
              <th>Language</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7">No leads found</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.source}</td>
                  <td>{lead.date}</td>
                  <td>{lead.location}</td>
                  <td>{lead.language}</td>
                  <td>{lead.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 🔥 MANUAL MODAL */}
        {showManual && (
          <div style={overlay}>
            <div style={modal}>
              <h3>Add New Lead</h3>

              <input name="name" placeholder="Name" onChange={handleChange} />
              <input name="email" placeholder="Email" onChange={handleChange} />
              <input
                name="source"
                placeholder="Source"
                onChange={handleChange}
              />
              <input name="date" placeholder="Date" onChange={handleChange} />
              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
              />
              <input
                name="language"
                placeholder="Preferred Language"
                onChange={handleChange}
              />

              <div style={{ marginTop: "10px" }}>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={() => setShowManual(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
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

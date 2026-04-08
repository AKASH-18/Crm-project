import { useState } from "react";
import axios from "axios";

function ManualModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    date: "",
    location: "",
    language: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/leads", form);
    window.location.reload();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Add New Lead</h3>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="source" placeholder="Source" onChange={handleChange} />
        <input name="date" placeholder="Date" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input
          name="language"
          placeholder="Preferred Language"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

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

export default ManualModal;

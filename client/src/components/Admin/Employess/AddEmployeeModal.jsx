import { useState } from "react";
import axios from "axios";
import "../../../styles/admin/employees.css";
function AddEmployeeModal({ show, onClose, refresh }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    language: "",
  });

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await axios.post(
        "axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);",
        {
          name: form.firstName + " " + form.lastName,
          email: form.email,
          location: form.location,
          language: form.language,
        },
      );

      alert("Employee created ✅");
    } catch (err) {
      console.log(err);
      alert("Error creating employee ❌");
    }

    refresh();
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h3>Add Employee</h3>
        <div>
          <h3>First Name</h3>
          <input
            name="firstName"
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div>
          <h3>Last Name</h3>
          <input
            name="lastName"
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div>
          <h3>Email</h3>
          <input name="email" onChange={handleChange} placeholder="Email" />
        </div>
        <div>
          <h3>Loacation</h3>
          <input
            name="location"
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <div>
          <h3>Preferred Language</h3>
          <input
            name="language"
            onChange={handleChange}
            placeholder="Language"
          />
        </div>

        <div>
          <button onClick={submit}>Save</button>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AddEmployeeModal;

import { useState } from "react";
import axios from "axios";
import "../../styles/employees.css";
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
    await axios.post("http://localhost:5000/users", {
      name: form.firstName + " " + form.lastName,
      email: form.email,
      location: form.location,
      language: form.language,
    });

    refresh();
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h3>Add Employee</h3>
        <div>
          <h3>Name</h3>
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
          <h3>Language</h3>
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

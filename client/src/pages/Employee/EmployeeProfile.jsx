import { useState } from "react";
import axios from "axios";
import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import "../../styles/Employee/employeerofile.css";

function EmployeeProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    firstName: user.name.split(" ")[0],
    lastName: user.name.split(" ")[1] || "",
    email: user.email,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await axios.put("http://localhost:5000/users/update-profile", {
      name: form.firstName + " " + form.lastName,
      email: form.email,
      password: form.password,
      userId: user._id,
    });

    alert("Profile updated ✅");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <EmployeeLayout title="Profile">
      <div className="profile-form">
        <label>First name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />

        <label>Last name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" onChange={handleChange} />

        <div className="profile-buttons">
          <button className="save-btn" onClick={save}>
            Save
          </button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeProfile;

import { useState } from "react";
import EmployeeLayout from "../../components/Employee/EmployeeLayout";
import "../../styles/Employee/employeeprofile.css";
import API from "../../api";

function EmployeeProfile() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data");
  }

  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    try {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await API.put("/users/update-profile", {
        name: form.firstName + " " + form.lastName,
        email: form.email,
        password: form.password,
        userId: user?._id,
      });

      alert("Profile updated ✅");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Update failed ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <EmployeeLayout title="Profile">
      <div className="profile-form">
        <div>
          <label>First name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>  
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

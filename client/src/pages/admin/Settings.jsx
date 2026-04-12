import { useState } from "react";
import Layout from "../../components/Admin/Layout";
import "../../styles/admin/setting.css";
import API from "../../api";

function Settings() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data");
  }

  const [form, setForm] = useState({
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await API.put("/api/users/update-profile", {
        email: form.email,
        password: form.password,
        userId: user?._id,
      });

      alert("Updated successfully ✅");
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
    <Layout>
      <div style={{ padding: "20px", maxWidth: "500px" }}>
        <h2>Settings</h2>

        <div style={{ marginTop: "20px" }}>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={input}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={input}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            style={input}
          />

          <button style={btn} onClick={handleSave}>
            Save Changes
          </button>

          <div className="log-out">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px 20px",
  background: "#0f2a2a",
  color: "white",
  borderRadius: "6px",
};

export default Settings;
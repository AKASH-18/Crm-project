import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingpage/landingpage.css";
import API from "../api";

function AdminLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      if (res.data.role !== "admin") {
        alert("Not authorized as admin");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="admin-login">
      <h2>
        Canova<span>CRM</span>
      </h2>
      <h2>Admin Loginn</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Submit</button>
    </div>
  );
}

export default AdminLogin;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingpage/landingpage.css";

function AdminLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    // 🔥 ONLY ONE ADMIN
    if (email === "admin@gmail.com" && password === "admin123") {
      const admin = {
        role: "admin",
        email,
      };

      localStorage.setItem("user", JSON.stringify(admin));
      setUser(admin);

      navigate("/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (  
    <div className="admin-login">
      <h2>Canova<span>CRM</span></h2>
      <h2>Admin Login</h2>

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

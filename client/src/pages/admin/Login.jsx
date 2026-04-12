import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      // 🔥 redirect based on role
      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
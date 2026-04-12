import { useState } from "react";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.log(err.response?.data); 
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function EmployeeLogin({ setUser }) {
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

      navigate("/employee-dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid employee credentials");
    }
  };

  return (
    <div className="employee-login">
      <h2>
        Canova<span>CRM</span>
      </h2>
      <h2>Employee Login</h2>

      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <button onClick={login}>Submit</button>
    </div>
  );
}

export default EmployeeLogin;
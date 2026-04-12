import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h2>
        Canova<span>CRM</span>
      </h2>

      <div className="landing-buttons">
        <button onClick={() => navigate("/admin-login")}>Admin Login</button>

        <button
          onClick={() => navigate("/employee-login")}
          style={{ marginLeft: "20px" }}
        >
          Employee Login
        </button>
      </div>
    </div>
  );
}

export default Landing;

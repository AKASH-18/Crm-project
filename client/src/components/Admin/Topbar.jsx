import { useLocation } from "react-router-dom";
import "./topbar.css";

function Topbar({ search, setSearch }) {
  const location = useLocation();

  const showSearch =
    location.pathname === "/employees" || location.pathname === "/leads";



  return (
    <div className="topbar">
      {/* LEFT SIDE */}
      <div>
        {!showSearch && <h3>Dashboard</h3>}

        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="search"
            value={search || ""}
            onChange={(e) => setSearch && setSearch(e.target.value)}
          />
        )}
      </div>

      {/* RIGHT SIDE */}
    
    </div>
  );
}

export default Topbar;

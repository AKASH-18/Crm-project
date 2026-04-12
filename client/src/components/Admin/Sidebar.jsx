import { useLocation } from "react-router-dom";
import "./topbar.css";

function Topbar({ search, setSearch }) {
  const location = useLocation();

  const showSearch =
    location.pathname.includes("/employees") ||
    location.pathname.includes("/leads");

  let title = "Dashboard";

  if (location.pathname.includes("employees")) title = "Employees";
  if (location.pathname.includes("leads")) title = "Leads";

  return (
    <div className="topbar">
      {/* LEFT SIDE */}
      <div>
        {!showSearch && <h3>{title}</h3>}

        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="search"
            value={search || ""}
            onChange={(e) => {
              if (setSearch) setSearch(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Topbar;
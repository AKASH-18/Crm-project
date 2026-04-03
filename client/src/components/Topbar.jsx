import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();

  const showSearch =
    location.pathname === "/employees" || location.pathname === "/leads";

  return (
    <div style={styles.topbar}>
      {/* LEFT SIDE */}
      <div>
        {!showSearch && <h3>Dashboard</h3>}

        {showSearch && (
          <input type="text" placeholder="Search..." style={styles.search} />
        )}
      </div>

      {/* RIGHT SIDE */}
      <div>
        <span>Admin</span>
      </div>
    </div>
  );
}

export default Topbar;

const styles = {
  topbar: {
    height: "15%",
    background: "white",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },

  search: {
    padding: "8px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
};

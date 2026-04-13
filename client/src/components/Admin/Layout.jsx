import { useState } from "react";
import "../../styles/admin/layout.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  const [search, setSearch] = useState("");

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SECTION */}
      <div className="admin-main">
        {/* TOPBAR */}
        <Topbar search={search} setSearch={setSearch} />

        {/* CONTENT */}
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;

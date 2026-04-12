import { useState } from "react";
import "../../styles/admin/layout.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  // 🔥 ADD SEARCH STATE
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
        <div className="admin-content">
          {/* 🔥 PASS SEARCH TO CHILDREN (SAFE) */}
          {typeof children === "function" ? children(search) : children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

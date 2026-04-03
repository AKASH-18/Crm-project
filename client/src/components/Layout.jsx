import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* 🔥 FIXED TOPBAR */}
        <Topbar />

        {/* Page content */}
        <div
          style={{ padding: "20px", boxSizing: "border-box", width: "100%" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

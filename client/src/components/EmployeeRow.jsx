import { useState } from "react";
import "./EmployeeRow.css";

function EmployeeRow({ user, selected, handleSelect, deleteUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected.includes(user._id)}
          onChange={() => handleSelect(user._id)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="avatar">{user.name.charAt(0)}</div>
          <div>
            <div>{user.name}</div>
            <small>{user.email}</small>
          </div>
        </div>
      </td>

      <td>#{user._id.slice(-8)}</td>
      <td>{user.assignedLeads || 0}</td>
      <td>{user.closedLeads || 0}</td>

      <td>
        <span className={user.status === "Active" ? "active" : "inactive"}>
          {user.status}
        </span>
      </td>

      <td >
        <button onClick={() => setMenuOpen(!menuOpen)}>⋮</button>

        {menuOpen && (
          <div className="menu">
            <div>✏️ Edit</div>
            <div onClick={() => deleteUser(user._id)}>🗑 Delete</div>
          </div>
        )}
      </td>
    </tr>
  );
}

export default EmployeeRow;

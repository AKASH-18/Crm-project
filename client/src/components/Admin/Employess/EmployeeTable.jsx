import { useState, useEffect } from "react";
import EmployeeRow from "./EmployeeRow";
import "../../../styles/admin/employees.css";

function EmployeeTable({ users, selected, setSelected, deleteUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;
  const [selectAll, setSelectAll] = useState(false);

  const indexOfLast = currentPage * usersPerPage;
  const currentUsers = users.slice(indexOfLast - usersPerPage, indexOfLast);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelected(checked ? currentUsers.map((u) => u._id) : []);
  };

  useEffect(() => {
    setSelectAll(
      selected.length === currentUsers.length && currentUsers.length > 0,
    );
  }, [selected, currentUsers]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              Name
            </th>
            <th>ID</th>
            <th>Assigned</th>
            <th>Closed</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <EmployeeRow
              key={user._id}
              user={user}
              selected={selected}
              handleSelect={handleSelect}
              deleteUser={deleteUser}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button className="left-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button className="right-button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default EmployeeTable;

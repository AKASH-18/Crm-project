import { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import EmployeeTable from "../../components/Admin/Employess/EmployeeTable";
import AddEmployeeModal from "../../components/Admin/Employess/AddEmployeeModal";
import API from "../../api";

function Employees({ search }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/with-leads"); // 🔥 fixed API
      setUsers(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      if (selected.length > 0) {
        await Promise.all(selected.map((uid) => API.delete(`/users/${uid}`)));
      } else {
        await API.delete(`/users/${id}`);
      }

      setSelected([]);
      fetchUsers();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const text = (search || "").toLowerCase();

    return (
      u.name.toLowerCase().includes(text) ||
      u.email.toLowerCase().includes(text)
    );
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 10px",
        }}
      >
        <h4>Employees</h4>

        <button
          onClick={() => setShowModal(true)}
          style={{
            borderRadius: "10px",
            padding: "10px 20px",
          }}
        >
          Add Employees
        </button>
      </div>

      <AddEmployeeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        refresh={fetchUsers}
      />

      <EmployeeTable
        users={filteredUsers}
        selected={selected}
        setSelected={setSelected}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default Employees;

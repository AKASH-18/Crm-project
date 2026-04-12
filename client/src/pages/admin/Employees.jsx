import { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import EmployeeTable from "../../components/Admin/Employess/EmployeeTable";
import AddEmployeeModal from "../../components/Admin/Employess/AddEmployeeModal";
import API from "../../api";

function Employees() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users/with-leads");
      setUsers(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ DELETE USERS
  const deleteUser = async (id) => {
    try {
      if (selected.length > 0) {
        await Promise.all(
          selected.map((uid) => API.delete(`/api/users/${uid}`))
        );
      } else {
        await API.delete(`/api/users/${id}`);
      }

      setSelected([]);
      fetchUsers();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <Layout>
      {(search) => {
        const filteredUsers = users.filter((u) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <>
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
          </>
        );
      }}
    </Layout>
  );
}

export default Employees;
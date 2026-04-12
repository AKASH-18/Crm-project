import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Admin/Layout";
import EmployeeTable from "../../components/Admin/Employess/EmployeeTable";
import AddEmployeeModal from "../../components/Admin/Employess/AddEmployeeModal";

function Employees() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = () => {
    axios
      .get("axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);/with-leads")
      .then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (selected.length > 0) {
      await Promise.all(
        selected.map((id) => axios.delete(`axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);/${id}`)),
      );
    } else {
      await axios.delete(`axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);/${id}`);
    }

    setSelected([]);
    fetchUsers();
  };

  return (
    <Layout>
      {(search) => {
        const filteredUsers = users.filter((u) =>
          u.name.toLowerCase().includes(search.toLowerCase()),
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

            {/* ✅ ONLY ONE TABLE */}
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

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import EmployeeTable from "../components/Employess/EmployeeTable";
import AddEmployeeModal from "../components/Employess/AddEmployeeModal";

function Employees() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (selected.length > 0) {
      await Promise.all(
        selected.map((id) => axios.delete(`http://localhost:5000/users/${id}`)),
      );
    } else {
      await axios.delete(`http://localhost:5000/users/${id}`);
    }

    setSelected([]);
    fetchUsers();
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <h2>Employees</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            borderRadius: "10px",
            padding: "10px 20px",
            position: "relative",
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
        users={users}
        selected={selected}
        setSelected={setSelected}
        deleteUser={deleteUser}
      />
    </Layout>
  );
}

export default Employees;

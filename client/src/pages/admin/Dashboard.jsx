import { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import "../../styles/admin/dashboard.css";
import API from "../../api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/api/dashboard");
        setData(res.data);
      } catch (err) {
        console.log("FETCH ERROR:", err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  const graphData =
    data.graph && data.graph.some((g) => g.count > 0)
      ? data.graph
      : [
          { date: "Mon", count: 3 },
          { date: "Tue", count: 6 },
          { date: "Wed", count: 4 },
          { date: "Thu", count: 8 },
          { date: "Fri", count: 5 },
          { date: "Sat", count: 7 },
          { date: "Sun", count: 2 },
        ];

  return (
    <Layout>
      <div className="dashboard">
        {/* 🔥 CARDS */}
        <div className="cards">
          <Card title="Unassigned Leads" value={data.unassigned} />
          <Card title="Assigned This Week" value={data.assignedThisWeek} />
          <Card title="Active Salespeople" value={data.activeEmployees} />
          <Card title="Conversion Rate" value={`${data.conversionRate}%`} />
        </div>

        {/* 🔥 GRAPH + ACTIVITY */}
        <div className="middle">
          <div className="graph">
            <h3>Sale Analytics</h3>

            <div className="graph-container">
              <div className="y-axis">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              <div className="bars">
                {graphData.map((g, i) => (
                  <div key={i} className="bar-wrapper">
                    <div
                      className="bar-fill"
                      style={{ height: `${g.count * 15}px` }}
                    />
                    <span>{g.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="activity">
            <h3>Recent Activity Feed</h3>

            <ul>
              {data.activity.map((a, i) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="employee-section">
          <div className="table-scroll">
            <table className="emp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee ID</th>
                  <th>Assigned Leads</th>
                  <th>Closed Leads</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.employees.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <div className="emp-info">
                        <div className="avatar">
                          {e.name?.charAt(0)}
                        </div>
                        <div>
                          <p>{e.name}</p>
                          <small>{e.email}</small>
                        </div>
                      </div>
                    </td>

                    <td>#{e._id.slice(-8)}</td>
                    <td>{e.assigned}</td>
                    <td>{e.closed}</td>

                    <td>
                      <span className="status active">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;
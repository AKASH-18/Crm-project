import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import SalesGraph from "../components/SalesGraph";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const sampleData = [
    { day: "Mon", rate: 20 },
    { day: "Tue", rate: 40 },
    { day: "Wed", rate: 30 },
    { day: "Thu", rate: 60 },
    { day: "Fri", rate: 50 },
    { day: "Sat", rate: 70 },
    { day: "Sun", rate: 65 },
  ];

  return (
    <Layout>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Unassigned Leads" value={stats.unassignedLeads || 0} />
        <Card title="Assigned This Week" value={stats.assignedThisWeek || 0} />
        <Card title="Active Sales People" value={stats.activeUsers || 0} />
        <Card title="Conversion Rate (%)" value={stats.conversionRate || 0} />
      </div>
      <div style={{ marginTop: "40px" }}>
        <h3>Sales Conversion (Last Week)</h3>
        <SalesGraph data={sampleData} />
      </div>
    </Layout>
  );
}

export default Dashboard;

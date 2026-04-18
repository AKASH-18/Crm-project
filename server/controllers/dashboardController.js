const Lead = require("../models/Lead");
const User = require("../models/User");

// 📊 DASHBOARD DATA
exports.getDashboardData = async (req, res) => {
  try {
    // 🔹 Unassigned Leads
    const unassigned = await Lead.countDocuments({
      assignedTo: null,
    });

    // 🔹 Assigned This Week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const assignedThisWeek = await Lead.countDocuments({
      createdAt: { $gte: startOfWeek },
      assignedTo: { $ne: null },
    });

    // 🔹 Active Employees
    const activeEmployees = await User.countDocuments({
      role: "user",
      status: "Active",
    });

    // 🔹 Conversion Rate
    const totalLeads = await Lead.countDocuments();
    const closedLeads = await Lead.countDocuments({
      status: "Closed",
    });

    const conversionRate =
      totalLeads === 0 ? 0 : Math.round((closedLeads / totalLeads) * 100);

    // 📈 GRAPH DATA (last 14 days)
    const graph = [];

    for (let i = 13; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);

      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);

      const count = await Lead.countDocuments({
        createdAt: {
          $gte: day,
          $lt: nextDay,
        },
      });

      graph.push({
        date: day.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      });
    }

    // 📌 RECENT ACTIVITY (last 3)
    const recentLeads = await Lead.find()
      .sort({ updatedAt: -1 })
      .limit(7)
      .populate("assignedTo", "name");

    const activity = recentLeads.map((lead) => {
      if (lead.status === "Closed") {
        return `Deal closed by ${lead.assignedTo?.name || "Unknown"}`;
      } else {
        return `Lead assigned to ${lead.assignedTo?.name || "Unassigned"}`;
      }
    });

    // 👨‍💼 TOP 5 EMPLOYEES
    const employees = await User.find({ role: "user", status: "Active" }).limit(
      5,
    );

    const employeeData = await Promise.all(
      employees.map(async (emp) => {
        const assigned = await Lead.countDocuments({
          assignedTo: emp._id,
          status: "Ongoing",
        });

        const closed = await Lead.countDocuments({
          assignedTo: emp._id,
          status: "Closed",
        });

        return {
          ...emp._doc,
          assigned,
          closed,
        };
      }),
    );

    res.json({
      unassigned,
      assignedThisWeek,
      activeEmployees,
      conversionRate,
      graph,
      activity,
      employees: employeeData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Dashboard error" });
  }
};

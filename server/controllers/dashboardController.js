const Lead = require("../models/Lead");
const User = require("../models/User");

// 📊 Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Unassigned Leads
    const unassignedLeads = await Lead.countDocuments({
      assignedTo: null,
    });

    // 2. Assigned This Week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const assignedThisWeek = await Lead.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    // 3. Active Sales People
    const activeUsers = await User.countDocuments({
      status: "Active",
    });

    // 4. Conversion Rate
    const totalAssigned = await Lead.countDocuments({
      assignedTo: { $exists: true },
    });

    const closedLeads = await Lead.countDocuments({
      status: "Closed",
    });

    const conversionRate =
      totalAssigned === 0
        ? 0
        : ((closedLeads / totalAssigned) * 100).toFixed(2);

    res.json({
      unassignedLeads,
      assignedThisWeek,
      activeUsers,
      conversionRate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

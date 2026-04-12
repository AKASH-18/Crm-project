const User = require("../models/User");
const Lead = require("../models/Lead");

const assignLead = async (language) => {
  // 🔥 find employees with same language
  const users = await User.find({
    role: "user",
    language: language,
  });

  if (users.length === 0) {
    console.log("❌ No users found for language:", language);
    return null;
  }

  let selectedUser = null;
  let minCount = Infinity;

  for (let user of users) {
    const count = await Lead.countDocuments({
      assignedTo: user._id,
    });

    // ✅ first priority: less than 3 leads
    if (count < 3) {
      console.log("✅ Assigned (<3):", user._id);
      return user._id;
    }

    // ✅ fallback: least loaded
    if (count < minCount) {
      minCount = count;
      selectedUser = user._id;
    }
  }

  console.log("✅ Assigned (fallback):", selectedUser);
  return selectedUser;
};

module.exports = assignLead;

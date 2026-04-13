const User = require("../models/User");
const Lead = require("../models/Lead");

// ➕ Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password: email, // default password
      role: "user",
    });

    res.json(user);
  } catch (err) {
    console.log("CREATE USER ERROR:", err);
    res.status(500).json({ error: "Error creating user" });
  }
};

// 📥 Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("GET USERS ERROR:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// ❌ Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: "Error deleting user" });
  }
};

// 🔧 Update Profile (Admin)
exports.updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOneAndUpdate(
      { role: "admin" },
      { email, password },
      { new: true },
    );

    res.json(admin);
  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: "Error updating profile" });
  }
};
// ticket assigned

// 👨‍💼 Get users with assigned lead count
exports.getUsersWithLeadCount = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    const usersWithCount = await Promise.all(
      users.map(async (user) => {
        // 🔥 ASSIGNED (ONLY ONGOING)
        const assigned = await Lead.countDocuments({
          assignedTo: user._id,
          status: "Ongoing",
        });

        // 🔥 CLOSED
        const closed = await Lead.countDocuments({
          assignedTo: user._id,
          status: "Closed",
        });

        return {
          ...user._doc,
          assignedLeads: assigned,
          closedLeads: closed,
        };
      }),
    );

    res.json(usersWithCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching users" });
  }
};
// 🔐 LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Debug logs (safe, helpful)
    console.log("Login attempt:", email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // ⚠️ Ensure password exists in DB
    if (!user.password) {
      return res.status(400).json({ error: "Password not set for user" });
    }

    // ✅ Trim to avoid space issues
    if (user.password.trim() !== password.trim()) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

const User = require("../models/User");

// store pointer per language
const pointerMap = {};

const assignLead = async (lead) => {
  const users = await User.find({ language: lead.language });

  if (!users.length) return null;

  // initialize pointer
  if (!pointerMap[lead.language]) {
    pointerMap[lead.language] = 0;
  }

  let attempts = 0;

  while (attempts < users.length) {
    const index = pointerMap[lead.language] % users.length;
    const user = users[index];

    // check threshold
    if (user.assignedLeads < 3) {
      user.assignedLeads += 1;
      await user.save();

      pointerMap[lead.language]++;
      return user._id;
    }

    pointerMap[lead.language]++;
    attempts++;
  }

  // fallback (if all full)
  return users[0]._id;
};

module.exports = assignLead;
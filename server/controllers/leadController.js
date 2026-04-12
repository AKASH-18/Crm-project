const fs = require("fs");
const csv = require("csv-parser");
const Lead = require("../models/Lead");
const assignLead = require("../utils/leadDistributor");

// 📥 Upload CSV
exports.uploadCSV = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        try {
          console.log("TOTAL ROWS:", results.length);

          for (let row of results) {
            // 🔥 clean keys
            const cleanRow = {};
            for (let key in row) {
              cleanRow[key.trim()] = row[key];
            }

            // 🔥 DEBUG (VERY IMPORTANT)
            console.log("ROW:", cleanRow);

            // 🔥 assign user

            const assignedUser = await assignLead(cleanRow.Language);
            console.log("ASSIGNED USER:", assignedUser);

            await Lead.create({
              name: cleanRow.Name,
              email: cleanRow.Email,
              source: cleanRow.Source,
              date: cleanRow.Date,
              location: cleanRow.Location,
              language: cleanRow.Language,
              assignedTo: assignedUser,
              status: "Ongoing",
            });
          }

          res.json({ message: "CSV processed successfully" });
        } catch (err) {
          console.log("SAVE ERROR:", err);
          res.status(500).json({ error: "Error processing CSV" });
        }
      });
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Error uploading CSV" });
  }
};

// 📊 Get all leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    console.log("FETCH ERROR:", err);
    res.status(500).json({ error: "Error fetching leads" });
  }
};

// ✏️ Update lead
exports.updateLead = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body); // 🔥 MUST PRINT

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body, // 🔥 IMPORTANT
      },
      { new: true }
    );

    console.log("UPDATED DOC:", updatedLead); // 🔥 MUST PRINT

    res.json(updatedLead);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ error: "Error updating lead" });
  }
};

// 👨‍💼 Get leads for logged-in employee
exports.getMyLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ assignedTo: req.params.userId });
    res.json(leads);
  } catch (err) {
    console.log("MY LEADS ERROR:", err);
    res.status(500).json({ error: "Error fetching employee leads" });
  }
};


exports.getScheduledLeads = async (req, res) => {
  try {
    const leads = await Lead.find({
      assignedTo: req.params.userId,
      scheduledDate: { $ne: null }, // ✅ FIX
    });

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Error fetching schedule" });
  }
};

exports.completeLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: "Closed" },
      { new: true },
    );

    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: "Error updating lead" });
  }
};

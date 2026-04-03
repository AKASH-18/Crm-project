const fs = require("fs");
const csv = require("csv-parser");
const Lead = require("../models/Lead");

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
        // 🔥 Clean keys (remove spaces)
        const cleanRow = {};
        for (let key in row) {
          cleanRow[key.trim()] = row[key];
        }

        results.push(cleanRow);
      })
      .on("end", async () => {
        try {
          console.log("TOTAL ROWS:", results.length);

          await Promise.all(
            results.map(async (row) => {
              await Lead.create({
                name: row.Name,
                email: row.Email,
                source: row.Source,
                date: row.Date,
                location: row.Location,
                language: row.Language,
                assignedTo: null,
                status: "Ongoing",
              });
            }),
          );

          res.json({ message: "CSV processed successfully" });
        } catch (err) {
          console.log("SAVE ERROR:", err);
          res.status(500).json({ error: "Error saving data" });
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
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedLead);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ error: "Error updating lead" });
  }
};

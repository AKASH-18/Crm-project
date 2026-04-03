const fs = require("fs");
const csv = require("csv-parser");
const Lead = require("../models/Lead");
const assignLead = require("../utils/leadDistributor");

// 📥 CSV Upload Controller
exports.uploadCSV = (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      try {
        await Promise.all(
          results.map(async (row) => {
            const assignedUser = await assignLead(row);

            await Lead.create({
              ...row,
              assignedTo: assignedUser,
              status: "Ongoing"
            });
          })
        );

        res.json({ message: "CSV processed successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error processing CSV" });
      }
    });
};
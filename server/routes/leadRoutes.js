const express = require("express");
const router = express.Router();

const {
  uploadCSV,
  getLeads,
  updateLead,
  getMyLeads,
  getScheduledLeads,
  completeLead,
} = require("../controllers/leadController");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.get("/my/:userId", getMyLeads);
router.get("/schedule/:userId", getScheduledLeads);
router.put("/complete/:id", completeLead);

module.exports = router;

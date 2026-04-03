const express = require("express");
const router = express.Router();

const {
  uploadCSV,
  getLeads,
  updateLead,
} = require("../controllers/leadController");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/", getLeads);
router.put("/:id", updateLead);

module.exports = router;

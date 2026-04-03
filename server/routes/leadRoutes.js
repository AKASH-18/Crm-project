const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadCSV } = require("../controllers/leadController");

// storage config
const upload = multer({ dest: "uploads/" });

// 📥 CSV Upload Route
router.post("/upload", upload.single("file"), uploadCSV);

router.get("/", (req, res) => {
  res.send("Lead route working");
});

module.exports = router;
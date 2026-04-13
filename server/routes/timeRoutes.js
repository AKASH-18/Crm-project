const express = require("express");
const router = express.Router();

const {
  toggleCheck,
  toggleBreak,
  getLog,
} = require("../controllers/timeController");

router.post("/check", toggleCheck);
router.post("/break", toggleBreak);
router.get("/:userId", getLog);

module.exports = router;
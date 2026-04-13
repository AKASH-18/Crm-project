const TimeLog = require("../models/TimeLog");

// ✅ CHECK IN / OUT
exports.toggleCheck = async (req, res) => {
  const { userId } = req.body;

  const today = new Date().toLocaleDateString();

  let log = await TimeLog.findOne({ userId, date: today });

  if (!log) {
    log = await TimeLog.create({
      userId,
      date: today,
      checkIn: new Date().toLocaleTimeString(),
      breaks: [],
    });
  } else if (!log.checkOut) {
    log.checkOut = new Date().toLocaleTimeString();
    await log.save();
  }

  res.json(log);
};

// ✅ BREAK START / END
exports.toggleBreak = async (req, res) => {
  const { userId } = req.body;

  const today = new Date().toLocaleDateString();

  const log = await TimeLog.findOne({ userId, date: today });

  // ❌ NO CHECK-IN → BLOCK
  if (!log || !log.checkIn) {
    return res.status(400).json({ error: "Please check in first" });
  }

  // ❌ ALREADY CHECKED OUT → BLOCK
  if (log.checkOut) {
    return res.status(400).json({ error: "Day ended" });
  }

  const lastBreak = log.breaks[log.breaks.length - 1];

  if (!lastBreak || lastBreak.end) {
    log.breaks.push({
      start: new Date().toLocaleTimeString(),
      date: today,
    });
  } else {
    lastBreak.end = new Date().toLocaleTimeString();
  }

  await log.save();
  res.json(log);
};

// ✅ GET LOG
exports.getLog = async (req, res) => {
  const today = new Date().toLocaleDateString();

  const log = await TimeLog.findOne({
    userId: req.params.userId,
    date: today,
  });

  res.json(log);
};

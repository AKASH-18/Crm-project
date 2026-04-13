const TimeLog = require("../modeles/TimeLog");

// ✅ CHECK IN / OUT
exports.toggleCheck = async (req, res) => {
  const { userId } = req.body;

  let log = await TimeLog.findOne({ userId });

  if (!log) {
    log = await TimeLog.create({
      userId,
      checkIn: new Date().toLocaleTimeString(),
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

  const log = await TimeLog.findOne({ userId });

  if (!log) return res.status(400).json({ error: "No session" });

  const lastBreak = log.breaks[log.breaks.length - 1];

  if (!lastBreak || lastBreak.end) {
    log.breaks.push({
      start: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });
  } else {
    lastBreak.end = new Date().toLocaleTimeString();
  }

  await log.save();
  res.json(log);
};

// ✅ GET LOG
exports.getLog = async (req, res) => {
  const log = await TimeLog.findOne({ userId: req.params.userId });
  res.json(log);
};

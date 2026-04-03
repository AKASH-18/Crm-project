const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("RUNNING NEW SERVER FILE 🚀");

app.use(cors());
app.use(express.json());

// 🔥 ROUTES
const leadRoutes = require("./routes/leadRoutes");
app.use("/leads", leadRoutes);

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

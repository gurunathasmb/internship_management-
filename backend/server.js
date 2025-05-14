const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

mongoose.connect("mongodb://localhost:27017/guru", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1); // optional: stop the server if DB fails
});
const path = require("path");
const fs = require("fs");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use("/api/auth", require("./routes/authRoutes"));
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/student", studentRoutes); // ✅ correct

const companyRoutes = require('./routes/companyRoutes');
app.use('/api/company', companyRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

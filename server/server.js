const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const path = require("path");

// Load environment variables from .env
dotenv.config();

// Port from env or default
const PORT = process.env.PORT || 3000;

// MongoDB connection
connectDb();

// Initialize express app
const app = express();

// Middleware: parse JSON
app.use(express.json());

// Middleware: enable CORS for any frontend (adjust later if needed)
app.use(cors());

// Serve static frontend files
const clientPath = path.join(__dirname, "../client");
app.use(express.static(clientPath));

// Routes
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

// Root Route (homepage)
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/explore", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "explore.html"));
});

app.get("/lab", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "lab.html"));
});

// Mount all routes
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AEXIS Server running on http://localhost:${PORT}`);
  console.log(`📡 Explorer: http://localhost:${PORT}/explore`);
  console.log(`🔬 Lab: http://localhost:${PORT}/lab`);
  console.log(`📊 API Docs: http://localhost:${PORT}/api/docs`);
});

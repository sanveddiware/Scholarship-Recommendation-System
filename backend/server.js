const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const scholarshipRoutes = require("./routes/scholarshipRoutes");
const authRoutes = require("./routes/authRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Root route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Scholarship Recommendation API is running"
    });
});

// Routes
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", studentProfileRoutes);
app.use(
    "/api/recommendations",
    recommendationRoutes
);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
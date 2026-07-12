const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.send("Research Ethics Committee Portal Backend");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/applications",applicationRoutes);

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
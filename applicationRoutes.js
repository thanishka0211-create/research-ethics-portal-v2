const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");

// Submit Application
router.post("/submit", applicationController.submitApplication);

// View All Applications
router.get("/", applicationController.getApplications);

// Update Application Status
router.put("/status/:id", applicationController.updateStatus);

module.exports = router;
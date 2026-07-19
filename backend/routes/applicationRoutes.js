const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const applicationController = require("../controllers/applicationController");

// Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Submit Application
router.post(
    "/submit",
    upload.fields([
        { name: "proposal_file", maxCount: 1 },
        { name: "consent_file", maxCount: 1 },
        { name: "supporting_file", maxCount: 1 }
    ]),
    (req, res, next) => {
        console.log("Upload middleware completed");
        next();
    },
    applicationController.submitApplication
);

// View All Applications
router.get("/", applicationController.getApplications);

// Update Application Status
router.put("/status/:id", applicationController.updateStatus);

module.exports = router;
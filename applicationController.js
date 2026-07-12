const applicationModel = require("../models/applicationModel");

// Submit Application
const submitApplication = (req, res) => {

    const applicationData = {
        research_title: req.body.research_title,
        research_area: req.body.research_area,
        principal_investigator: req.body.principal_investigator,
        objective: req.body.objective,
        methodology: req.body.methodology,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        researcher_email:req.body.researcher_email,
        proposal_file: req.body.proposal_file,
        consent_file: req.body.consent_file,
        supporting_file: req.body.supporting_file
    };
      
    console.log("REQ BODY:",req.body);
    console.log("APLLICATION DATA:",applicationData);

    applicationModel.createApplication(applicationData, (err, result) => {

        if (err) {
    console.error("MYSQL ERROR:");
    console.error(err);
    console.error(err.sqlMessage);
    console.error(err.code);

    return res.status(500).json({
        success: false,
        message: err.sqlMessage
    });
}

        res.json({
            success: true,
            message: "Application submitted successfully"
        });

    });

};

// Get Applications
// Get Applications
const getApplications = (req, res) => {

    console.log("Query Email:", req.query.email);

    applicationModel.getApplications(req.query.email, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        console.log("Database Results:", results);

        res.json(results);

    });

};

// Update Status
const updateStatus = (req, res) => {

    const id = req.params.id;
    const status = req.body.status;

    applicationModel.updateStatus(id, status, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message:err.sqlMessage || err.message
            });
        }

        res.json({
            success: true,
            message: "Status updated successfully"
        });

    });

};

module.exports = {
    submitApplication,
    getApplications,
    updateStatus
};
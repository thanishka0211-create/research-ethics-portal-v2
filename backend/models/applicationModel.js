const db = require("../config/db");

// Create Application
const createApplication = (applicationData, callback) => {

    const sql = `
        INSERT INTO research_projects (
            research_title,
            research_area,
            principal_investigator,
            objective,
            methodology,
            start_date,
            end_date,
            researcher_email,
            proposal_file,
            consent_file,
            supporting_file
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query(sql, [
        applicationData.research_title,
        applicationData.research_area,
        applicationData.principal_investigator,
        applicationData.objective,
        applicationData.methodology,
        applicationData.start_date,
        applicationData.end_date,
        applicationData.researcher_email,
        applicationData.proposal_file,
        applicationData.consent_file,
        applicationData.supporting_file
    ], callback);
};

// Get All Applications
const getApplications = (email, callback) => {

    let sql;
    let values = [];

    if (email) {
        sql = `
            SELECT * FROM research_projects
            WHERE researcher_email = ?
            ORDER BY project_id DESC
        `;
        values = [email];
    } else {
        sql = `
            SELECT * FROM research_projects
            ORDER BY project_id DESC
        `;
    }

    db.query(sql, values, (err, results) => {
        callback(err, results);
    });

};

// Update Status
const updateStatus = (id, status, callback) => {

    const sql = `
        UPDATE research_projects
        SET status = ?
        WHERE project_id = ?
    `;

    db.query(sql, [status, id], callback);

};

module.exports = {
    createApplication,
    getApplications,
    updateStatus
};
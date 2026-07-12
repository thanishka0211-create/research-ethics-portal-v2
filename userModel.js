const db = require("../config/db");

// Register User
const registerUser = (userData, callback) => {
    const sql = `
        INSERT INTO users
        (full_name, email, password, role, phone, department, designation)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userData.full_name,
            userData.email,
            userData.password,
            userData.role,
            userData.phone,
            userData.department,
            userData.designation
        ],
        callback
    );
};

// Login User
const loginUser = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};

module.exports = {
    registerUser,
    loginUser
};
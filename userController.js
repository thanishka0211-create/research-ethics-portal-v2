const userModel = require("../models/userModel");

// ================= REGISTER =================
exports.register = (req, res) => {

    userModel.registerUser(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Registration Failed",
                error: err
            });
        }

        res.status(201).json({
            message: "User Registered Successfully!"
        });

    });

};

// ================= LOGIN =================
exports.login = (req, res) => {

    const { email, password, role } = req.body;

    userModel.loginUser(email, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Login Failed",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        // Password check
        if (user.password !== password) {
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }

        // Role check
        if (user.role !== role) {
            return res.status(401).json({
                message: "Please select the correct role."
            });
        }

        res.status(200).json({
            message: "Login Successful",
            user: user
        });

    });

};
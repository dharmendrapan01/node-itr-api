const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { userRegister, getUsers, getUserById, updateUser, deleteUser, userLogin, OTPValidate } = require("./user.service");
const { sign } = require("jsonwebtoken");

module.exports = { 
    createUser : async (req, res) => {
        try {
            const body = req.body;   
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt); 
            userRegister(body, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, message: "Database connection failed", error: error });
                }
                return res.status(200).json({ success: 1, data: results });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    login : async (req, res) => {
        try {
            const body = req.body;
            userLogin(body.mobile, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, error: error });
                }
                if(!results) {
                    return res.json({ success: 0, message: "Invalid username or password" });
                }
                // const result = compareSync(body.password, results.Password);
                if (results) {
                    // results.password = undefined;
                    const jsonToken = sign({ result: results }, process.env.JWT_SECRET, { expiresIn: "1d" });
                    return res.status(200).json({ success: 1, message: "User logged in successfully", token: jsonToken });
                } else {
                    return res.json({ success: 0, message: "Invalid username or password" });
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    userOTP : async (req, res) => {
        const body = req.body;
        OTPValidate(body.mobile, body.otp, (error, results) => {
            if(error) {
                return res.status(400).json({ success: 0, error: error });
            }
            if(!results) {
                return res.json({ success: 0, message: "Invalid OTP" });
            }
            return res.status(200).json({ success: 1, data: results });
        })
    },

    getUsers : async (req, res) => {
        try {
            getUsers((error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, error: error });
                }
                if(!results) {
                    return res.json({ success: 0, message: "Record not found" });
                }
                return res.status(200).json({ success: 1, data: results });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    getUserById : async (req, res) => {
        try {
            const id = req.params.id;
            getUserById(id, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, error: error });
                }
                if(!results) {
                    return res.json({ success: 0, message: "Record not found" });
                }
                return res.status(200).json({ success: 1, data: results });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    updateUser : async (req, res) => {
        try {
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            updateUser(body, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, error: error });
                }
                if(!results) {
                    return res.json({ success: 0, message: "Failed to update user" });
                }
                return res.status(200).json({ success: 1, message: "User updated successfully" });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    deleteUser : async (req, res) => {
        try {
            const id = req.params.id;
            deleteUser(id, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, error: error });
                }
                if(!results) {
                    return res.json({ success: 0, message: "Record not found" });
                }
                return res.status(200).json({ success: 1, message: "User deleted successfully" });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}
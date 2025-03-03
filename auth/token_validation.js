const e = require("express");
const {  verify } = require("jsonwebtoken");

module.exports = {
    validateToken: (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized access" });
                }
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(403).send("A token is required for authentication");
        }
    }
};
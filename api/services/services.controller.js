const { saveService, getService } = require("./services.service");

module.exports = {
    createService : async (req, res) => {
        try {
            const body = req.body;   
            saveService(body, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, message: "Database connection failed", error: error });
                }
                return res.status(200).json({ success: 1, data: results });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    getServices : async (req, res) => {
        try {
            getService((error, results) => {
                if (error) {
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
    }
};
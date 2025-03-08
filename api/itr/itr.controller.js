const { saveItr } = require("./itr.service");

module.exports = {
    createITR : async (req, res) => {
        try {
            const body = req.body;   
            saveItr(body, (error, results) => {
                if(error) {
                    return res.status(400).json({ success: 0, message: "Database connection failed", error: error });
                }
                return res.status(200).json({ success: 1, data: results });
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
};
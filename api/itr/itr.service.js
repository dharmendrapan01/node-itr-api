const pool = require("../../config/database");

module.exports = {
    saveItr : async (body, callBack) => {
        pool.query(
            `insert into itr (UserId, PAN, Aadhar, CreatedAt, UpdatedAt) values (?,?,?,?,?)`,
            [
                body.user_id,
                body.pan,
                body.aadhar,
                body.created_at,
                body.updated_at
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
};
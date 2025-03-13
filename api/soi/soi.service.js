const pool = require("../../config/database");

module.exports = {
    saveSoi : async (body, callBack) => {
        const currentDate = new Date();
        pool.query(
            `insert into sourceofincome (Name, CreatedAt) values (?,?)`,
            [
                body.name,
                currentDate
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results); 
            }
        )
    },


    getSoi : async (callBack) => {
        pool.query(
            `select * from sourceofincome`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
};
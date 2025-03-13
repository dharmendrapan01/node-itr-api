const pool = require("../../config/database");

module.exports = {
    saveService : async (data, callBack) => {
        const currentDate = new Date();
        pool.query(
            `insert into services (Name, CreatedAt) values (?,?)`,
            [
                data.name,
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

    getService : async (callBack) => {
        pool.query(
            `select * from services`,
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
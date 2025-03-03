const pool = require("../../config/database");

module.exports = {
    userRegister : async (data, callBack) => {
        pool.query(
            `insert into users (FirstName, MiddleName, LastName, Email, Mobile, Password, CreatedAt, UpdatedAt) values (?,?,?,?,?,?,?,?)`,
            [
                data.first_name,
                data.middle_name,
                data.last_name,
                data.email,
                data.mobile,
                data.password,
                data.created_at,
                data.updated_at
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    userLogin : async (mobile, callBack) => {
        // console.log(data, "service");
        pool.query(
            `select * from users where Mobile = ?`,
            [mobile],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUsers : async (callBack) => {
        pool.query(
            `select * from users`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserById : async (id, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    updateUser : async (data, callBack) => {
        pool.query(
            `update users set FirstName = ?, MiddleName = ?, LastName = ?, Email = ?, Mobile = ?, Password = ?, UpdatedAt = ? where id = ?`,
            [
                data.first_name,
                data.middle_name,
                data.last_name,
                data.email,
                data.mobile,
                data.password,
                data.updated_at,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                console.log(results);
                
                return callBack(null, results);
            }
        )
    },

    deleteUser : async (id, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}
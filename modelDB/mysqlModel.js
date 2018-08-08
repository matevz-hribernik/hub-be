/**
 * Created by EkaterinaAcc on 21-Oct-15.
 */
var mysql      = require('mysql');
var settings = require("../settings.js");
var pool = mysql.createPool(
    settings.sqlSettings
);

var exacuteQuery = function(sqlQuery, callback){
    pool.getConnection(function(err, connection){
        if (err){
            throw err;
        }
        connection.query(sqlQuery, function(error, result){
            if (error){
                console.log("Error " + sqlQuery + " " + error)
            }
            return callback(null, result);
        });
        connection.release();
    });
};

var exacuteQueryWithArgs = function(sqlQuery, data,  callback){

    pool.getConnection(function(err, connection){
        if (err){
            callback(error)
        }

        connection.query(sqlQuery, data, function(error, result){
            if (error){
                console.log("Error " + sqlQuery + " " + data + " " + error);
                callback(error)
            }else{
                callback(null, result);
            }

        });
        connection.release();
    });
};

module.exports.exacuteQuery = exacuteQuery;
module.exports.exacuteQueryWithArgs = exacuteQueryWithArgs;

/**
 * Created by EkaterinaAcc on 21-Oct-15.
 */
var mysql      = require('mysql');
var settings = require("../settings.js");
var pool = mysql.createPool(
    settings.sqlSettings
);

var exacuteQuery = function(sqlQuerry, callback){
    //console.log(sqlQuerry);
    pool.getConnection(function(err, connection){
        if (err){
            //console.log(err);
            throw err;
        }
        connection.query(sqlQuerry, function(error, result){
            if (error){
                console.log(error);
                //throw error;
            }
            return callback(null, result);
        });
        connection.release();
        //console.log("updateUserLogOnDisconect conection id " + connection.threadId+ " has been released!");
    });
};

var exacuteQueryWithArgs = function(sqlQuery, data,  callback){

    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            callback(error)
        }
        connection.query(sqlQuery, data, function(error, result){
            if (error){
                console.log("****" + error)
                callback(error)
            }else{
                callback(null, result);
            }

        });
        connection.release();
        //console.log("updateUserLogOnDisconect conection id " + connection.threadId+ " has been released!");
    });
};

module.exports.exacuteQuery = exacuteQuery;
module.exports.exacuteQueryWithArgs = exacuteQueryWithArgs;

/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");
var crypto = require('crypto-js');

module.exports.registerNewUser = function(req,  callback){

    var email = req.body.Email;
    var password = req.body.Password;
    var name = req.body.FirstName;
    var lastname = req.body.LastName;
    returnUserIfUserExists(email, function(err, res){
        if(err){
            callback({status:"NOK", error:err})
        }else{
            if(res == null){
                password =  crypto.SHA1(password).toString(crypto.enc.Base64);
                //register a new user
                var query = "INSERT INTO " +settings.tableNames.user + " (Email, FirstName, LastName, Password ) VALUES (?, ?, ?, ?);";
                var insert = [email, name, lastname, password];

                sql.exacuteQueryWithArgs(query, insert, function(error, result){
                    if(error){

                        return callback(undefined, {status:"NOK", error:err});
                    }else{
                        return callback(undefined, {status:"AOK", id:result.insertId});
                    }
                });
            }else{
                return(callback(null,{status:"UAE"} ));
            }
        }
    })
};

//Check if user with email exists
//if exists return pwd and id_user
//else return null
var returnUserIfUserExists = function(email, callback){
    var query = 'SELECT * FROM ' + settings.tableNames.user + ' WHERE Email LIKE ?';
    var insert = [email];
    sql.exacuteQueryWithArgs(query, insert, function(error, result){
        if(!error){
            if(result.length < 1){
                return callback(null, null);
            }else{
                return callback(null, result);
            }
        }
    });
};
module.exports.returnUserIfUserExists = returnUserIfUserExists;


module.exports.updateUser = function(req, callback){
    var Email = req.body.Email;
    returnUserIfUserExists(Email, function(err, res){
        if(!err){
            if (res != null){
                var FirstName = req.body.FirstName ? req.body.FirstName : res[0].FirstName;
                var LastName = req.body.LastName ? req.body.LastName : res[0].LastName;
                var Admin = req.body.Admin ? req.body.Admin : res[0].Admin;
                var DecimalPoint = req.body.DecimalPoint ? req.body.DecimalPoint : res[0].DecimalPoint;
                var Deimiter = req.body.Deimiter ? req.body.Deimiter : res[0].Deimiter;
                var Scatter = req.body.Scatter ? req.body.Scatter : res[0].Scatter;
                var password = req.body.Password;
                var hashed_password = crypto.SHA1(password).toString(crypto.enc.Base64);
                if(res[0].Password == hashed_password) {
                    var query = "UPDATE " + settings.tableNames.user + " SET Email = ?,FirstName = ?, LastName = ?, Admin = ?, DecimalPoint = ?, Delimiter = ?, Scatter = ? WHERE ID = ?;";
                    var arg = [Email, FirstName, LastName, Admin, DecimalPoint, Deimiter, Scatter, res[0].ID];
                    sql.exacuteQueryWithArgs(query, arg, function (err, result) {
                        if (!err) {
                            callback(null, {"status": "AOK"});
                        }
                    });
                    //callback(null, res);
                }else{
                    callback(null, {"status": "PDNM"});
                }
            }else{
                callback(null,{"status":"UDNE"})
            }
        }else{
            callback(null, "UDE");
        }
    })
};

module.exports.getAllUsers = function(callback){
    var querry = "SELECT * FROM " + settings.tableNames.user;
    sql.exacuteQuery(querry,function(err, result){
        if( err){
            callback(err,{status:"NOK", response:settings.messages.error})
        }else{
            callback(null, {status:"AOK", res:result})
        }
    })
};
module.exports.deleteUser = function(Email, callback){
    returnUserIfUserExists(Email, function(err, res){
        if(!err){
            if (res != null){
                var query = "DELETE from " + settings.tableNames.user + " WHERE Email = " + res[0].id_user;
                sql.exacuteQuery(query, function (err, result) {
                    if (!err) {
                        callback(null, {"status": "AOK"});
                    }
                });
            }else{
                callback(null,{"status":"UDNE"})
            }
        }else{
            callback(null, "UDE");
        }
    })
};
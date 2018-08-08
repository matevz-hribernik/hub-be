/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");
var user = require("./user.js");
var crypto = require('crypto-js');

var updateUserLogOnDisconect = function(req, callback){

    var loginID = req.ID;
    var query = "UPDATE "+ settings.tableNames.userLogin+ " SET LogoutTime = CURRENT_TIMESTAMP() WHERE ID = " + loginID;
    sql.exacuteQuery(query, function(err, res){
        if(err){
            callback(null, {status:"NOK", error:err})
        }else{
            callback(null, {status:"AOK"})
        }
    });
};

//Login
var userLogin = function(req, callback) {
    var Email = req.body.Email;
    var PhoneID = req.body.PhoneID;
    var PhoneName = req.body.PhoneName.replace(/\s/g,'');
    var Passowrd = req.body.Password;
    var hashed_password = crypto.SHA1(Passowrd).toString(crypto.enc.Base64);

    user.returnUserIfUserExists(Email, function (err, res) {
        if (err) {
            callback({status: "NOK", error:err});
        } else if (res == null) {
            return callback(null, {status: "UDNE"}); //UserDoesNotExist
        } else {

            if (res[0].Password == hashed_password) {
                var ID = res[0].ID;
                var FirstName = res[0].FirstName;
                var LastName = res[0].LastName;
                var Email = res[0].Email;
                var query = "INSERT INTO "+ settings.tableNames.userLogin +" (UserID, PhoneID, PhoneName) VALUES (?, ?, ?)";
                var value = [ID, PhoneID,PhoneName];
                sql.exacuteQueryWithArgs(query,value, function(err, result){
                    if(err){
                        callback(null, {status:'NOK', err:err})
                    }else{
                        return callback(null, {status: "AOK",
                            LoginID:result.insertId,
                            ID: res[0].id_user,
                            FirstName:FirstName,
                            LastName:LastName,
                            Email:Email,
                            Admin:res[0].Admin,
                            Delimiter:res[0].Delimiter,
                            DecimalPoint:res[0].DecimalPoint
                        });
                    }
                });
            } else {
                return callback(null, {status: "PDNM"}); //passwords do not match
            }
        }
    });
};

module.exports.getAllUsersLogins = function (ID, callback) {

    var query = "SELECT * FROM "+ settings.tableNames.userLogin +" WHERE UserID = ?";
    var args = [ ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback({status: "NOK", error:err});
        }else{
            callback(null, {status:"AOK", data:res})
        }
    })

};
module.exports.userLogin=userLogin;
module.exports.updateUserLogOnDisconect = updateUserLogOnDisconect;
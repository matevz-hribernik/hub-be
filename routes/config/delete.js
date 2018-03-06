/**
 * Created by Administrator on 16.3.2016.
 */
var crypto = require('crypto-js');
//var rand = require('csprng');
var sql = require('../../modelDB/sqlDo.js');
var settings = require("../../settings.js");

exports.delete = function(email,password, callback) {
    var hashed_password = crypto.SHA1(password).toString(crypto.enc.Base64);
    sql.deleteAccountFromDB(email,hashed_password, function(err, res){
        console.log("Result of delete action is " + res.status)
        if(!err){

            if(res.status == "UDNE"){
                console.log(res.status == "UDNE");
                callback(null, {
                    status:res.status,
                    response:settings.messages.user_does_not_exist
                })
            }else if(res.status == "AOK"){
                callback(null, {
                    status:res.status,
                    response:settings.messages.delete_was_successful

                })
            }else if(res.status == "PDNM"){
                callback(null, {
                    status:res.status,
                    response:settings.messages.wrong_pwd
                })
            }
        }else{
            callback(null, {
                status:false,
                response:settings.messages.error
            })
        }
    });
};
/**
 * Created by Administrator on 16.3.2016.
 */
/**
 * Created by Administrator on 16.3.2016.
 */
var crypto = require('crypto-js');
//var rand = require('csprng');
var sql = require('../../modelDB/sqlDo.js');
var settings = require("../../settings.js");

exports.chpassword = function(email,password, new_password, callback) {
    var hashed_password = crypto.SHA1(password).toString(crypto.enc.Base64);
    var hashed_new_password = crypto.SHA1(new_password).toString(crypto.enc.Base64);

    sql.changeAccountPassword(email,hashed_password,hashed_new_password, function(err, res){
        if(!err){
            console.log("res in pwd change "+ res.status);
            if(res.status == "UDNE"){
                callback(null, {
                    status:res.status,
                    response:settings.messages.user_does_not_exist
                })
            }else if(res.status == "AOK"){
                callback(null, {
                    status:res.status,
                    response:settings.messages.change_was_succ

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
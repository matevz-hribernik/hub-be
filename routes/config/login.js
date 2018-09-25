/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto-js');
//var rand = require('csprng');
var sql = require('../../modelDB/sqlDo.js');
var settings = require("../../settings.js");

exports.login = function(email,password, phoneId,phoneName, callback) {
    var hashed_password = crypto.SHA1(password).toString(crypto.enc.Base64);
    sql.userLogin(email, hashed_password, phoneId, phoneName, function(err, res){
        //console.log(res);
        if(!err){
            if(res.status == "UDNE"){
                callback(response:settings.messages.user_does_not_exist, 404)
            }else if(res.status == "AOK"){
                //console.log(res);
                callback(null, res)
            }else if(res.status == "PDNM"){
                callback(settings.messages.wrong_pwd, 401)
            }
        }else{
            callback(response:settings.messages.error)
        }
    });
};
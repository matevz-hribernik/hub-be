/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
var crypto = require('crypto-js');
//var rand = require('csprng');
var sql = require('../../modelDB/sqlDo.js');
var settings = require("../../settings.js");

exports.login = function(email,password, phoneId,phoneName, callback) {
    var hashed_password = crypto.SHA1(password).toString(crypto.enc.Base64);
    sql.userLogin(email,hashed_password, phoneId,phoneName, function(err, res){
        //console.log(res);
        if(!err){
            if(res.status == "UDNE"){
                callback(null,{
                    status:res.status,
                    response:settings.messages.user_does_not_exist
                })
            }else if(res.status == "AOK"){
                //console.log(res);
                callback(null, {
                        status:res.status,
                        response:settings.messages.login_was_successful,
                        userid:res.userid,
                        logid:res.logid,
                        name:res.name,
                        lastname:res.lastname,
                        email:res.email,
                        admin:res.admin,
						delimiter:res.delimiter,
						decimal_point:res.decimal_point


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
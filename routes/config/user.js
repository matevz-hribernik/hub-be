/**
 * Created by EkaterinaAcc on 20-Oct-16.
 */
var crypto = require('crypto-js');
//var rand = require('csprng');
var sql = require('../../modelDB/sqlDo.js');
var validator = require("email-validator");
var settings = require("../../settings.js");

exports.register = function(email, password,name, lastname, callback) {
    //console.log(validator.validate(email));
    if (validator.validate(email) ){

        if(name != null && lastname != null){
            var hashed_password =  crypto.SHA1(password).toString(crypto.enc.Base64);
            sql.registerNewUser(email, name, lastname,  hashed_password, function(err, res){
                if(err){
                    console.log(err);
                    callback(null, {
                        status:"NOK",
                        response: settings.messages.error});
                }else{
                    if(res == "AOK"){
                        //console.log(res);
                        callback(null, {
                            status:"AOK",
                            response:settings.messages.reg_success
                        });
                    }else if(res == "UAE"){
                        callback(null, {
                            status:"UAE",
                            response:settings.messages.user_already_exists
                        });
                    }
                }
            });
        }else{
            callback(null, {
                status:"EF",
                response:settings.messages.empty_fields
            }); //empty fields name and lastname
        }

    }else{
        callback(null, {
            status:"WEF",
            response:settings.messages.wrong_email_format
        }); //Wrong email format
    }
};

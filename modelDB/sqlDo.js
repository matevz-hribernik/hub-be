
var sql = require("./mysqlModel.js");
var settings = require("../settings.js");





// Store sensors data in DB
// input: id_user ( equals to socket.id)
//data in JSON format
//returns void
var storeSensorsData = function(id, data){
    query = "INSERT INTO measures (id_user) VALUES ("+id + ")";
    sql.exacuteQuery(query, function(error, res){
        if (error){
            //console.log(error);
            throw error;
        }else{
            var id = res.insertId;
            if(data.acc!=null){
                queryAcc =  "INSERT into data_acc (id_measures, acc_x, acc_y, acc_z ) VALUES ( " + id+ ", " + data.acc.x +", " + data.acc.y +", " + data.acc.z + ")";
                queryGyro = "INSERT into data_gyro (id_measures, gyro_x, gyro_y, gyro_z ) VALUES ( " + id+ ", " + data.gyro.x +", " + data.gyro.y +", " + data.gyro.z + ")";
                queryGrav = "INSERT into data_grav (id_measures, grav_x, grav_y, grav_z ) VALUES ( " + id+ ", " + data.grav.x +", " + data.grav.y +", " + data.grav.z + ")";
                var queries = [queryAcc, queryGyro, queryGrav];
                for (var i = 0; i < queries.length; i++) {
                    console.log(queries[i]);
                    sql.exacuteQuery(queries[i], function (err, res) {
                        if (err)
                            console.log(err);
                    });
                }
            }
        }
    });
};


var insertMeasure = function( loginId, dataTypeId, location, callback){
    var query = "INSERT INTO " + settings.tableNames.measure + " (id_login, id_type, location_start) VALUES ( ?, ?, ?); ";
    var values = [loginId, dataTypeId, location];
    sql.exacuteQueryWithArgs(query, values, function(err, res){
        var measuerId = res.insertId;
        if(!err){
            callback(null,{status:"AOK", measureid:measuerId});
        }else{
            callback(null,{status:"NOK", response:settings.messages.error})
        }
    })
};
var insertMeasureStop = function( measureId, location, description, callback){
    var query = "UPDATE " + settings.tableNames.measure + " SET location_end = ?, time_stop = CURRENT_TIMESTAMP(), description = ? WHERE id_measure = ?; ";
    var values = [location, description, parseInt(measureId)];
    sql.exacuteQueryWithArgs(query, values, function(err, res){
	
        if(!err){
            callback(null,{status:"AOK"});
        }else{
            callback(null,{status:"NOK", response:settings.messages.error})
        }
    })
};

var updateDescription = function(id, description,callback){
    var query = "UPDATE " + settings.tableNames.measure + " SET description = ? WHERE id_measure = ?; ";
	var values = [description, id];
	sql.exacuteQueryWithArgs(query, values, function(err, res){

        if(!err){
            callback(null,{status:"AOK"});
        }else{
            callback(null,{status:"NOK", response:settings.messages.error})
        }
    })
}
//// data = json of acc{x,y,z} gyro grav mag
//var storeSensorsDataFromUdp = function(data){
//    var measureId = data.measureid;
//    var queryAcc =  "INSERT into data_acc (id_measure, acc_x, acc_y, acc_z ) VALUES ( " + measureId + ", " + data.acc.x +", " + data.acc.y +", " + data.acc.z + ")";
//    var queryGyro = "INSERT into data_gyro (id_measure, gyro_x, gyro_y, gyro_z ) VALUES ( " + measureId + ", " + data.gyro.x +", " + data.gyro.y +", " + data.gyro.z + ")";
//    var queryGrav = "INSERT into data_grav (id_measure, grav_x, grav_y, grav_z ) VALUES ( " + measureId + ", " + data.grav.x +", " + data.grav.y +", " + data.grav.z + ")";
//    var queryMag = "INSERT into data_mag (id_measure, mag_x, mag_y, mag_z ) VALUES ( " + measureId + ", " + data.mag.x +", " + data.mag.y +", " + data.mag.z + ")";
//    var queries = [queryAcc, queryGyro, queryGrav,queryMag];
//    for (var i = 0; i < queries.length; i++) {
//        //console.log(queries[i]);
//        sql.exacuteQuery(queries[i], function (err, res) {
//            if (err)
//                console.log(err);
//        });
//    }
//};
var forgotpassword = require('../routes/config/forgotPassword.js');
var generatePassword = require('password-generator');
var crypto = require('crypto-js');
var validator = require("email-validator");

module.exports.forgotPassword = function(email, callback){
    if (validator.validate(email) ){
        returnPasswordIfUserExists(email, function( err, res){
             if(!err){
                if (res != null){
                //    generate new pwd
                    var newPassword = generatePassword(8, false);
                    var hashed_password = crypto.SHA1(newPassword).toString(crypto.enc.Base64);
                    var query = "UPDATE " + settings.tableNames.user + " SET password = ?  WHERE email = ?;";
                    var args = [hashed_password, email];
                    sql.exacuteQueryWithArgs(query, args, function(error, result){
                        if(!error){
                            console.log(result.affectedRows);
                            if(result.affectedRows > 0){
                                console.log("password changed!!!!");
                                forgotpassword.newPwd(email,newPassword);
                                callback(null, {"status": "AOK"});
                            }
                        }
                    });
                }else{
                    callback(null,{"status":"UDNE"})
                }
            }else{
                callback(null, {"status":"NOK"});
            }
        })
    }else{
        callback(null,{"status": "WPF"});
    }
};

var changeAccountPassword = function(email, password, new_password, callback){
    returnPasswordIfUserExists(email, function( err, res){
        if(!err){
            if (res != null){
                console.log(res[0].password);
                console.log(password);
                if(res[0].password == password) {
                    var query = "UPDATE " + settings.tableNames.user + " SET password = ?  WHERE id_user = ?;";
                    var arg = [new_password, res[0].id_user];
                    sql.exacuteQueryWithArgs(query, arg, function (err, result) {
                        if (!err) {
                            console.log(result.affectedRowst);
                            callback(null, {"status": "AOK"});
                        }
                    });
                    callback(null, res);
                }else{
                    callback(null, {"status": "PDNM"});
                }
            }else{
                console.log("UDNE");
                callback(null,{"status":"UDNE"})
            }

        }else{
            callback(null, "UDE");
        }
    })
};
var deleteAccountFromDB = function(email, password, callback){
    returnPasswordIfUserExists(email, function(err, res){
        if(!err){
            if (res != null){
                //console.log(res[0].password);
                if(res[0].password == password) {
                    var query = "DELETE from " + settings.tableNames.user + " WHERE id_user = " + res[0].id_user;
                    //var arga = [email];
                    sql.exacuteQuery(query, function (err, result) {
                        if (!err) {
                            //console.log(result.affectedRowst);
                            callback(null, {"status": "AOK"});
                        }
                    });
                    //callback(null, res);
                }else{
                    callback(null, {"status": "PDNM"});
                }
            }else{
                console.log("UDNE");
                callback(null,{"status":"UDNE"})
            }

        }else{
            callback(null, "UDE");
        }
    })
};


var storeDataOfSensorFromUdp = function(data){

    var measureId = data.measureid;
    var time = data.time;
    var tables = ["acc", "gyro","grav","mag", "acc_raw"];
    var table = tables[data.sensor];
    //var query =  "INSERT into ? (id_measure, acc_x, acc_y, acc_z, time ) VALUES ( " + measureId + ", " + data.x +", " + data.y +", " + data.z + ")";
    var query =  "INSERT into data_" + table +" (id_measure, " + table + "_x, "+table + "_y, "+table + "_z, time ) VALUES (  ?, ?, ?, ?, ?);";
    var args = [measureId ,  data.x, data.y, data.z, time];
    sql.exacuteQueryWithArgs(query,args, function(err, res){
        if (err){
            console.log(err);
        }
    })
};


var getDataTypes = function(callback){
   query = "SELECT * FROM " + settings.tableNames.measure_typre + ";"
   sql.exacuteQuery(query, function(err, res){
       if(!err){
           callback(null,{
               status:"AOK",
               data:res
           });
       }else{
           callback(null, {
               status:"NOK",
               response:settings.messages.error
           })
       }
   })
};
var getMeasuresByEmail = function(userId, callback){
    var query = "SELECT * FROM measure WHERE id_login in (SELECT id_login FROM user_login WHERE id_user = ?)";
    console.log(userId);
	var args = [userId];
    sql.exacuteQueryWithArgs(query,args, function(e, res){
        if(!e){
            //console.log(res);
            callback(null, {res:res});
        }
    })
};
var getSensorData = function(measureId, callback){
    var data = [];
    var tables = [settings.tableNames.data_acc, settings.tableNames.data_gyro, settings.tableNames.data_grav,
        settings.tableNames.data_mag, settings.tableNames.data_acc_raw];
    var arg = [measureId];
    var index = 0;
    for(table in tables ) {
        var query = "SELECT * FROM " + tables[table] + " WHERE id_measure = ? ORDER BY time ASC"
        sql.exacuteQueryWithArgs(query, arg, function (err, result) {

            if (!err) {
                if(result.length > 0){
                    data.push(result);
                    console.log(result.length);
                }
                index += 1;
                console.log("data.length "+ data.length);
                if (index == 5) {
                    //console.log(data);
                    callback(null, data);
                }
            }
        });
    }
};

module.exports.deleteMeasure = function(measureid, callback){
	
	var query = "DELETE from " + settings.tableNames.measure + " WHERE id_measure = " + measureid;
	console.log(query);
	sql.exacuteQuery(query, function(err, result){
		if(!err){
			console.log(result.affectedRows);
			callback(null, {status:"AOK"});
		}else{
			callback(null, {status:"NOK"})
		}
	});

};
module.exports.changeAdminStatus = function(id, status, callback){
    returnUserIfUserIDExists(id, function(err, res){
        if(!err){
            if (res != null){

                var query = "UPDATE  " + settings.tableNames.user + "  SET admin = ?  WHERE id_user = ?;";
                var args = [ status, res[0].id_user];
                sql.exacuteQueryWithArgs(query,args, function (err, result) {
                    if (!err) {
                        callback(null, {"status": "AOK"});
                    }
                });
            }else{
                //console.log("UDNE");
                callback(null,{"status":"UDNE"})
            }
        }else{
            callback(null, "UDE");
        }
    })
};

module.exports.changeDelimiters = function(id, delimiter, decimal_point, callback){
    returnUserIfUserIDExists(id, function(err, res){
        if(!err){
            if (res != null){

                var query = "UPDATE  " + settings.tableNames.user + "  SET delimiter = ?, decimal_point = ?  WHERE id_user = ?;";
                var args = [ delimiter, decimal_point, res[0].id_user];
                sql.exacuteQueryWithArgs(query,args, function (err, result) {
                    if (!err) {
                        callback(null, {"status": "AOK"});
                    }
                });
            }else{
                //console.log("UDNE");
                callback(null,{"status":"UDNE"})
            }
        }else{
            callback(null, "UDE");
        }
    })
};
module.exports.updateDescription = updateDescription;
module.exports.getSensorData = getSensorData;
module.exports.getMeasuresByEmail = getMeasuresByEmail;
module.exports.changeAccountPassword = changeAccountPassword;
module.exports.deleteAccountFromDB = deleteAccountFromDB;
module.exports.insertMeasureStop = insertMeasureStop;
module.exports.getDataTypes = getDataTypes;
module.exports.insertMeasure = insertMeasure;

module.exports.storeSensorsData=storeSensorsData;

module.exports.storeDataOfSensorFromUdp = storeDataOfSensorFromUdp;

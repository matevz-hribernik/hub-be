/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postSensorType = function(req,  callback){
    var Name = req.body.Name;
    var Description = req.body.Description;
    var DOF = req.body.DOF;
    var Number = req.body.Number;

    var query = "INSERT INTO "+ settings.tableNames.sifSensorType +" (Name, Description, DOF, Number) VALUES (?, ?, ?, ?)";
    var data = [Name, Description, DOF, Number];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: res})
        }
    })
};

module.exports.updateSensorType = function(req, callback){
    var ID = req.params.sensortypeID;
    var query = "SELECT * from " + settings.tableNames.sifSensorType + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{

            var Name = req.body.Name ? req.body.Name : res[0].Name;
            var Description = req.body.Description ? req.body.Description : res[0].Description;
            var DOF = req.body.DOF ? req.body.DOF : res[0].DOF;
            var Number = req.body.Number ? req.body.Number : res[0].Number;
            query = "UPDATE "+ settings.tableNames.sifSensorType +" SET Name = ?, Description = ?, DOF = ?, Number = ? WHERE ID = ?;";
            args = [Name, Description, DOF, Number, ID];
            console.log(query, args)
            sql.exacuteQueryWithArgs(query,args, function(err, result){
                if(err){
                    callback(err);
                }else{
                    callback(null, {status: "AOK"});
                }
            });
        }
    });

};

module.exports.getAllSensorTypes = function(callback){
    var query = "SELECT * from " + settings.tableNames.sifSensorType + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneSensorType = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.sifSensorType + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.deleteSensorType = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.sifSensorType + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        console.log(err)
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
//    //////////////////Sensor
module.exports.postSensor = function(req,  callback){
    var SensorTypeID = req.body.SensorTypeID;
    var Range = req.body.Range;
    if (typeof Range != "number") {
        callback({status:"NOK", error:"DeviceSampleTime must be a number."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.sensor +" (SensorTypeID, `Range`) VALUES (?, ?);";
        var data = [SensorTypeID, Range];

        console.log(query, data)
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};

module.exports.updateSensor = function(req, callback){
    var ID = req.params.sensorID;
    var query = "SELECT * from " + settings.tableNames.sensor + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var SensorTypeID = req.body.SensorTypeID ? req.body.SensorTypeID : res[0].SensorTypeID;
            var Range = req.body.Range ? req.body.Range : res[0].Range;
            if (typeof Range != "number") {
                callback({status:"NOK", error:"Range must be a number."})
            }
            query = "UPDATE "+ settings.tableNames.sensor +" SET SensorTypeID = ?, `Range` = ? WHERE ID = ?;";
            args = [SensorTypeID, Range,ID];
            sql.exacuteQueryWithArgs(query,args, function(err, result){
                if(err){
                    callback(err);
                }else{
                    callback(null, {status: "AOK"});
                }
            });
        }
    });
};

module.exports.getAllSensors = function(callback){
    var query = "SELECT * from " + settings.tableNames.sensor + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneSensor = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.sensor + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteSensor = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.sensor + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
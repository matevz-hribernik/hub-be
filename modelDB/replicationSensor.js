/**
 * Created by EkaterinaAcc on 27-Nov-16.
 */


var sql = require("./mysqlModel.js");
var settings = require("../settings.js");


//    //////////////////Sensor data
module.exports.postReplicationSensor = function(req,  callback){
    var ExperimentID = req.body.ExperimentID;
    var DeviceID = req.body.DeviceID;
    var SensorID = req.body.SensorID;
    var ReplicationID = req.body.ReplicationID;
    var SampleTime = req.body.SampleTime;
    var MetaData = req.body.MetaData;

    if (typeof SampleTime != "number") {
        callback({status:"NOK", error:"sensor data must be a number."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.replicationSensor +" (ExperimentID, `DeviceID`, SensorID, ReplicationID, SampleTime, MetaData) VALUES (?,?,?,?,?, ?);";
        var data = [ExperimentID, DeviceID, SensorID, ReplicationID, SampleTime, MetaData];
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};



module.exports.getAllReplicationSensor = function(callback){
    var query = "SELECT * from " + settings.tableNames.replicationSensor + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getReplicationSensorByID = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.replicationSensor + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteReplicationSensorByID = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.replicationSensor + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
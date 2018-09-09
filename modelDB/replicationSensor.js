/**
 * Created by EkaterinaAcc on 27-Nov-16.
 */


var sql = require("./mysqlModel.js");
var settings = require("../settings.js");


//    //////////////////Sensor data
module.exports.postReplicationSensor = function(body,  callback){
    var ExperimentID = body.ExperimentID;
    var DeviceID = body.DeviceID;
    var SensorID = body.SensorID;
    var ReplicationID = body.ReplicationID;
    var SampleTime = body.SampleTime;
    var MetaData = body.MetaData;
    console.log(body)

    if (typeof SampleTime != "number") {
        callback("sensor data must be a number.")
    }else{
        var query = "INSERT INTO "+ settings.tableNames.replicationSensor +" (ExperimentID, `DeviceID`, SensorID, ReplicationID, SampleTime, MetaData) VALUES (?,?,?,?,?, ?);";
        var data = [ExperimentID, DeviceID, SensorID, ReplicationID, SampleTime, MetaData];
        console.log(data, query)
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback(err);
            }else{
                callback(null, res)
            }
        })
    }
};



module.exports.getAllReplicationSensor = function(callback){
    var query = "SELECT * from " + settings.tableNames.replicationSensor + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};
module.exports.getReplicationSensorByReplication = function(replicationID, callback){
    var query = "SELECT * from " + settings.tableNames.replicationSensor + "WHERE ReplicationID = ?;";
    var args = [ReplicationID]
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
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
            callback(null)
        }else{
            callback(err);
        }
    });
};
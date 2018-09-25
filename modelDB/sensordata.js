/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");


//    //////////////////Sensor data
module.exports.postSensorData = function(req,  callback){
    var ReplicationID = req.body.ReplicationID;
    var SampleTime = req.body.SampleTime;
    var DOF1 = req.body.DOF1;
    var DOF2 = req.body.DOF2;
    var DOF3 = req.body.DOF3;
    if (typeof DOF1 != "number", typeof DOF2 != "number", typeof DOF3 != "number") {
        callback({status:"NOK", error:"sensor data must be a number."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.sensorData +" (ReplicationID, `SampleTime`, DOF1, DOF2, DOF3) VALUES (?,?,?,?,?);";
        var data = [ReplicationID, SampleTime, DOF1, DOF2, DOF3];
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback(err);
            }else{
                callback(null, res)
            }
        })
    }
};



module.exports.getAllSensorData = function(callback){
    var query = "SELECT * from " + settings.tableNames.sensorData + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};

module.exports.getSensorDataByReplicationID = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.sensorData + " WHERE ReplicationID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};
module.exports.deleteSensorByReplicationID = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.sensorData + " WHERE ReplicationID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null)
        }else{
            callback(err);
        }
    });
};
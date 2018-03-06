/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");


//    //////////////////Sensor data
module.exports.postSensorData = function(req,  callback){
    var ReplicationSensorID = req.body.ReplicationSensorID;
    var TimeStamp = req.body.TimeStamp;
    var DOF1 = req.body.DOF1;
    var DOF2 = req.body.DOF2;
    var DOF3 = req.body.DOF3;
    if (typeof DOF1 != "number", typeof DOF2 != "number", typeof DOF3 != "number") {
        callback({status:"NOK", error:"sensor data must be a number."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.sensorData +" (ReplicationSensorID, `TimeStamp`, DOF1, DOF2, DOF3) VALUES (?,?,?,?,?);";
        var data = [ReplicationSensorID, TimeStamp, DOF1, DOF2, DOF3];
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};



module.exports.getAllSensorData = function(callback){
    var query = "SELECT * from " + settings.tableNames.sensorData + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getSensorDataByReplicationSensorID = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.sensorData + " WHERE ReplicationSensorID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteSensorByReplicationSensorID = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.sensorData + " WHERE ReplicationSensorID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
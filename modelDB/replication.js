/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postReplication = function(req,  callback){
    var MeasurementID = req.body.MeasurementID;

    var query = "INSERT INTO "+ settings.tableNames.replication + " (MeasurementID) VALUES (?)";
    var data = [MeasurementID];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: res})
        }
    })
};

module.exports.updateReplication = function(req, callback){
    var MeasurementID = req.body.MeasurementID ? req.body.MeasurementID : res[0].MeasurementID;
  
    var ID = req.params.replicationID;
    var query = "SELECT * from " + settings.tableNames.replication + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback({status:"NOK", error: "Record does not exist"});
        }else{
            query = "UPDATE "+ settings.tableNames.replication +" SET MeasurementID = ? WHERE ID = ?;";
            args = [MeasurementID,ID];
            sql.exacuteQueryWithArgs(query,args, function(err, result){
                if(err){
                    callback({status:"NOK", error:err});
                }else{
                    callback(null, {status: "AOK"});
                }
            });
        }
    });
};

module.exports.getAllReplications = function(requestQuery, callback){

    var query = "SELECT * from " + settings.tableNames.replication;
    var args = [];
    if (requestQuery && typeof requestQuery.MeasurementID !== 'undefined') {
        query += " WHERE MeasurementID = ?";
        args.push(requestQuery.MeasurementID)
    }
    query += ";";
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneReplication = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.replication + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteDevice = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.replication + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
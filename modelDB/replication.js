/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postReplication = function(req, callback){
    var MeasurementID = req.body.MeasurementID;
    var query = "INSERT INTO "+ settings.tableNames.replication + " (MeasurementID, TimestampFrom) VALUES (?, ?)";
    var data = [MeasurementID, new Date().getTime()];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback(err);
        }else{
            callback(null,  {
                ID: res.insertId
            })
        }
    })
};

module.exports.updateReplication = function(req, callback){
  
    var ID = req.params.replicationID;
    var query = "SELECT * from " + settings.tableNames.replication + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback({status:"NOK", error: "Record does not exist"});
        }else{
            var MeasurementID = req.body.MeasurementID ? req.body.MeasurementID : res[0].MeasurementID;
            var Active = req.body.Active;
            var TimestampTo = req.body.TimestampTo;
            args = [];
            if (MeasurementID || typeof Active !== 'undefined') {
                query = "UPDATE "+ settings.tableNames.replication +" SET ";

                if (MeasurementID) {
                    query += "MeasurementID = ?"
                    args.push(MeasurementID)
                }

                if (typeof Active !== 'undefined') {
                    if (MeasurementID) {
                        query += ', '
                    }
                    query += "Active = ? "
                    args.push(Active)
                }

                if (typeof TimestampTo !== "undefined") {
                    if (MeasurementID || typeof Active !== 'undefined') {
                         query += ', '
                    }
                    query += "TimestampTo = ?"
                    args.push(TimestampTo)
                }

                query += " WHERE ID = ?;"
                args.push(ID);
                sql.exacuteQueryWithArgs(query,args, function(err, result){
                    if(err){
                        callback(err);
                    }else{
                        callback(null, result);
                    }
                });
            } else {
                callback("No arguments");
            }
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
    query += " ORDER BY TimestampFrom DESC;";

    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};

module.exports.getOneReplication = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.replication + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};

module.exports.deleteReplicationByID = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.replication + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    });
};
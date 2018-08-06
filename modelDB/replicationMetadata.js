/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postReplicationMetadata = function(req,  callback){
    var ReplicationID = req.body.ReplicationID;
    var MetaData = req.body.MetaData;
    console.log(req.body)
    var query = "INSERT INTO "+ settings.tableNames.replicationMetadata + " (ReplicationID, MetaData) VALUES (?, ?)";
    var data = [ReplicationID, MetaData];
    console.log(data)
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback(err);
        }else{
            callback(null, {
                ID: res.insertId
            })
        }
    })
};

module.exports.updateReplicationMetadata = function(req, callback){
  
    var ID = req.params.replicationID;
    var MetaData = req.body.MetaData;
    var query = "SELECT * from " + settings.tableNames.replicationMetadata + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback({error: "Record does not exist"});
        }else{
            var ReplicationID = req.body.ReplicationID ? req.body.ReplicationID : res[0].ReplicationID;
            var MetaData = req.body.MetaData;
            args = [];
            if (ReplicationID || typeof MetaData !== 'undefined') {
                query = "UPDATE "+ settings.tableNames.replicationMetadata +" SET ";

                if (ReplicationID) {
                    query += "ReplicationID = ?"
                    args.push(ReplicationID)
                }

                if (typeof MetaData !== 'undefined') {
                    if (ReplicationID) {
                        query += ', '
                    }
                    query += "MetaData = ? "
                    args.push(MetaData)
                }
                query += "WHERE ID = ?;"
                args.push(ID);
                sql.exacuteQueryWithArgs(query,args, function(err, result){
                    if(err){
                        callback({error:err});
                    }else{
                        callback(null, {});
                    }
                });
            } else {
                callback({error:"No arguments"}, 400);
            }
        }
    });
};

module.exports.getAllReplicationMeatadata = function(requestQuery, callback){

    var query = "SELECT * from " + settings.tableNames.replicationMetadata;
    var args = [];
    if (requestQuery && typeof requestQuery.ReplicationID !== 'undefined') {
        query += " WHERE ReplicationID = ?";
        args.push(requestQuery.ReplicationID)
    }
    query += ";";
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};

module.exports.getOneReplicationMetadata = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.replicationMetadata + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, res)
        }else{
            callback(err);
        }
    })
};
module.exports.deleteReplicationMetadataByID = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.replicationMetadata + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null)
        }else{
            callback(err);
        }
    });
};
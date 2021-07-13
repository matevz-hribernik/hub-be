/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postExperiment = function(req,  callback){
    var Name = req.body.Name;
    var Description = req.body.Description;
    var query = "INSERT INTO "+ settings.tableNames.experiment +" (Name, Description) VALUES (?, ?)";
    var data = [Name, Description];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback({status:"AOK"})
        }
    })
};

module.exports.updateExperiment = function(req, callback){
    var ID = req.params.experimentID;
    var query = "SELECT * from " + settings.tableNames.experiment + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{

            var Name = req.body.Name ? req.body.Name : res[0].Name;
            var Description = req.body.Description ? req.body.Description : res[0].Description;
            query = "UPDATE "+ settings.tableNames.experiment +" SET Name = ?, Description = ? WHERE ID = ?;";
            args = [Name, Description,ID];
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

module.exports.getAllExperiments = function(callback){
    var query = "SELECT experiment.*, sifreplicationmetadata.MetadataNo, sifreplicationmetadata.Description as MetaDescription FROM `experiment` left join sifreplicationmetadata on experiment.ID=sifreplicationmetadata.ExperementID;";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneExperiment = function(ID, callback){
    var query = "SELECT experiment.*, sifreplicationmetadata.MetadataNo, sifreplicationmetadata.Description as MetaDescription  FROM `experiment` left join sifreplicationmetadata on experiment.ID=sifreplicationmetadata.ExperementID WHERE experiment.ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteExperiment = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.experiment + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    })

};
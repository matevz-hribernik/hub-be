/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

/*var sql = require("./mysqlModel.js");
var settings = require("../settings.js");*/
var neo4j = require("./neo4jModel.js");
var settings = require("../settings.js");

module.exports.postExperiment = function(req,  callback){
    var Name = req.body.Name;
    var Description = req.body.Description;
    if(!Name){
        callback({status:"NOK", error:"Name is required"});
    }else{
        var query = "MERGE (e:Experiment {name:$name, description=$description})";
        var data = {
            name:Name,
            description: Description
        };
        neo4j.exacuteQueryWithArgs(query,data, function(err,res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK",data:res});
            }
        });
    }
    /*var Name = req.body.Name;
    var Description = req.body.Description;
    var query = "INSERT INTO "+ settings.tableNames.experiment +" (Name, Description) VALUES (?, ?)";
    var data = [Name, Description];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback({status:"AOK"})
        }
    })*/
};

module.exports.updateExperiment = function(req, callback){
    var ID = Number(req.params.experimentID);
    var query = "MATCH (e:Experiment) where id(e)=$id return id(e),e.name,e.description";
    var args={id:ID};
    var args2;
    var query2;
    neo4j.exacuteQueryWithArgs_noClose(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            param=Number(res.records[0].get("id(e)"));
            var Name=req.body.Name ? req.body.Name : res.records[0].get("e.name");
            var Description=req.body.Description ? req.body.Description : res.records[0].get("e.description");
            query2="MATCH (e:Experiment) where id(e)=$id SET e.Name=$name,e.description=$description";
            args2={
                id: param,
                name: Name,
                description: Description
            };
        }
        neo4j.exacuteQueryWithArgs(query2,args2,function(err,res){
            if(err){
                callback(err);
            }else{
                callback(null, {status: "AOK"});
            }
        });
    });
    /*var ID = req.params.experimentID;
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
    });*/

};

module.exports.getAllExperiments = function(callback){
    var query="MATCH (e:Experiment) return id(e),e.name,e.description";
    neo4j.exacuteQuery(query,function(err,res){
        if(!err){
            var res_data=[];
            res.records.forEach(experiment =>{
                var ID=Numebr(experiment.get("id(e)"));
                var name=experiement.get("e.name");
                var description = experiment.get("e.description");
                var e= {
                    ID:ID,
                    Name:name,
                    Description:description
                };
                res_data.push(e);
            });
            callback(null,{status:"AOK",data:res_data});
        }else{
            callback({status:"NOK",error:err});
        }
    });
    /*var query = "SELECT experiment.*, sifreplicationmetadata.MetadataNo, sifreplicationmetadata.Description as MetaDescription FROM `experiment` left join sifreplicationmetadata on experiment.ID=sifreplicationmetadata.ExperementID;";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.getOneExperiment = function(ID, callback){
    
    /*var query = "SELECT experiment.*, sifreplicationmetadata.MetadataNo, sifreplicationmetadata.Description as MetaDescription  FROM `experiment` left join sifreplicationmetadata on experiment.ID=sifreplicationmetadata.ExperementID WHERE experiment.ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
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
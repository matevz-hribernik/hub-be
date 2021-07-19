/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

 var neo4j = require("./neo4jModel.js");
 var settings = require("../settings.js");


module.exports.postActivity = function(req,  callback){
    var Name = req.body.Name;
    var Description = req.body.Description;
    if(!Name){
        callback({status:"NOK",error:"Name is required"});
    }else{
        var query= "MERGE (n:Activity { name: $name, description: $description })";
        var data={
            name:Name,
            description:Description
        };
        neo4j.exacuteQueryWithArgs(query,data,function(err,res){
            if(err){
                callback({status:"NOK",error:err});
            }else{
                callback(null,{status:"AOK",data:res});
            }
        })
    }
    /*var query = "INSERT INTO "+ settings.tableNames.experiment +" (Name, Description) VALUES (?, ?)";
    var data = [Name, Description];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback({status:"AOK"})
        }
    })*/
};


module.exports.updateActivity = function(req, callback){
    var ID = Number(req.params.activityID);
    var query = "MATCH (a:Activity) where id(a)=$id return id(a), a.name,a.description";
    var args = { id:ID};
    var args2;
    var query2;
    neo4j.exacuteQueryWithArgs_noClose(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            param=Number(res.records[0].get("id(a)"));
            var Name = req.body.Name ? req.body.Name : res.records[0].get("a.name");
            var Description = req.body.Description ? req.body.Description : res.records[0].get("a.description");
            query2 = "MATCH (a:Activity) where a.id=$id SET a.name=$name, a.description=$description";
            args2={
                id: param,
                name: Name,
                description: Description
            };
        }
        neo4j.exacuteQueryWithArgs(query2, args2, function(err, res){
            if(err){
                callback(err);
            }else{
                callback(null,{status:"AOK"});
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
            console.log(res);
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

module.exports.getAllActivities = function(callback){
     var query = "MATCH (a:Activity) return id(a), a.name, a.description";
     neo4j.exacuteQuery(query, function(err, res){
         if(!err){
             var res_data=[];
             res.records.forEach(activity =>{
                 var ID = Number(activity.get("id(a)"));
                 var name = activity.get("a.name");
                 var description = activity.get("a.description");
                 var a = {
                     ID : ID,
                     Name: name,
                     Description: description
                    }
                res_data.push(a);
             });
             callback(null, {status: "AOK", data: res_data});
         }else{
             callback({status:"NOK", error:err});
         }
     })
    /*var query = "SELECT experiment.*, sifreplicationmetadata.MetadataNo, sifreplicationmetadata.Description as MetaDescription FROM `experiment` left join sifreplicationmetadata on experiment.ID=sifreplicationmetadata.ExperementID;";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.getOneActivity = function(ID, callback){
    var query = "MATCH (a:Activity) where ID(a)=$id return id(a), a.name, a.description";
    var arg={id:Number(ID)};
    neo4j.exacuteQueryWithArgs(query,arg,function(err, res){
        if(!err){
            var res_data=[];
            var res_data=[];
            res.records.forEach(activity => {
                console.log(activity.get("id(a)"))
                var ID = Number(activity.get("id(a)"));
                var name = activity.get("a.name");
                var description = activity.get("a.description");
                var a = {
                        ID: ID,
                        Name: name,
                        Description: description
                        }
                    res_data.push(a)
            });
            callback(null, {status:"AOK", data:res_data});
        }else{
            callback({status:"NOK", error:err});
        }       
    
    })
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

//get activity with the name
module.exports.getOneActivityName = function(Name, callback){
    var query = "MATCH (a:Activity) where a.name=$name return id(a), a.name, a.description";
    var arg={name:Name};
    neo4j.exacuteQueryWithArgs(query,arg,function(err, res){
        if(!err){
            var res_data=[];
            var res_data=[];
            res.records.forEach(activity => {
                console.log(activity.get("id(a)"))
                var ID = Number(activity.get("id(a)"));
                var name = activity.get("a.name");
                var description = activity.get("a.description");
                var a = {
                        ID: ID,
                        Name: name,
                        Description: description
                        }
                    res_data.push(a)
            });
            callback(null, {status:"AOK", data:res_data});
        }else{
            callback({status:"NOK", error:err});
        }       
    
    })
};

module.exports.deleteActivity = function(ID, callback){
    var query = "MATCH (c)-[]-(n) where ID(n)=$id return count(c)";
    var arg = {id: Number(ID)}
    neo4j.exacuteQueryWithArgs_noClose(query, arg, function(err, res){
        if(!err && Number(res.records[0]._fields)<1){
            //DELETE ID only if no conncetion exists
            query2="MATCH (n: Activity) WHERE ID(n) = $id DELETE n"
            console.log(query2, arg)
            neo4j.exacuteQueryWithArgs(query2, arg, function(err, res){
                if(!err){
                    //console.log(res);
                    callback(null, {status:"AOK"})
                }else{
                    callback({status:"NOK", error:err});
                } 
            });
        }else{
            callback({status:"NOK", error:err});
        }
    })
    /*var query = "DELETE FROM " + settings.tableNames.experiment + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/

};
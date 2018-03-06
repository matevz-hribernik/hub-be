/**
 * Created by EkaterinaAcc on 27-Nov-16.
 */


var sql = require("./mysqlModel.js");
var settings = require("../settings.js");


//    //////////////////Sensor data
module.exports.postSubject = function(req,  callback){
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var Remark = req.body.Remark;
   

    if (!FirstName || !LastName || !Remark) {
        callback({status:"NOK", error:"Name, LastName and Remark are required."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.subject +" (FirstName, LastName, Remark) VALUES (?,?,?);";
        var data = [FirstName, LastName, Remark];
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};



module.exports.getAllSubject = function(callback){
    var query = "SELECT * from " + settings.tableNames.subject + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getSubjectByID = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.subject + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteSubjectByID = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.subject + " WHERE ID = ?;";
    var arg = [ID];
    console.log(ID)
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};

module.exports.updateSubject = function(req, callback){
    var ID = req.params.subjectID;
    var query = "SELECT * FROM " + settings.tableNames.subject + " WHERE ID = ?;";
    var args = [ID];

    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var FirstName = req.body.FirstName ? req.body.FirstName : res[0].FirstName;
            var LastName = req.body.LastName ? req.body.LastName : res[0].LastName;
            var Remark = req.body.Remark ? req.body.Remark : res[0].Remark;
            query = "UPDATE "+ settings.tableNames.subject +" SET FirstName = ?, LastName = ?, Remark = ? WHERE ID = ?;";
            args = [FirstName, LastName, Remark, ID];

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
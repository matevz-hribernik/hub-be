/**
 * Created by EkaterinaAcc on 27-Nov-16.
 */


var sql = require("./mysqlModel.js");
var settings = require("../settings.js");


//    //////////////////Sensor data make new user
module.exports.postSubject = function(req,  callback){
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var Remark = req.body.Remark;
    var Height = req.body.Height;
    var Weight = req.body.Weight;
    var Age = req.body.Age;
    var BirthDay = req.body.BirthDay;

    if (!FirstName || !LastName || !Remark) {
        callback({status:"NOK", error:"Name, LastName and Remark are required."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.subject +" (FirstName, LastName, Height, Weight, Age, BirthDay, Remark) VALUES (?,?,?,?,?,?,?);";
        var data = [FirstName, LastName, Height, Weight, Age, BirthDay, Remark];
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};

//Make new user
//CREATE (n:Subject { firstname: 'Matevž', lastname:'Hribernik', birthdate: date('1995-02-02'), placeofbirth: 'Celje', countryofbirth: 'Slovenia', gender: 'Male', UUID:''????, remark:'developer' })



module.exports.getAllSubject = function(callback){
    var query = "SELECT ID, FirstName,LastName,Height,Weight,Age, BirthDay, Remark from subject WHERE DEL = 0";
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
    var query = "UPDATE "+ settings.tableNames.subject +" SET DEL = TRUE WHERE ID = ?;";
    var arg = [ID];
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
    //console.log(ID, args)
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var FirstName = req.body.FirstName ? req.body.FirstName : res[0].FirstName;
            var LastName = req.body.LastName ? req.body.LastName : res[0].LastName;
            var Height = req.body.Height ? req.body.Height : res[0].Height;
            var Weight = req.body.Weight ? req.body.Weight : res[0].Weight;
            var Age = req.body.Age ? req.body.Age : res[0].Age;
            var BirthDay = req.body.BirthDay ? req.body.BirthDay : res[0].BirthDay;
            var Remark = req.body.Remark ? req.body.Remark : res[0].Remark;
            query = "UPDATE "+ settings.tableNames.subject +" SET FirstName = ?, LastName = ?, Height = ?, Weight = ?, Age = ?, BirthDay = ?, Remark = ? WHERE ID = ?;";
            args = [FirstName, LastName, Height, Weight, Age, BirthDay, Remark, ID];
            //console.log(args);
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
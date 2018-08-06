/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postMeasurement = function(req,  callback){
    var ExperimentID = req.body.ExperimentID;
    var UserLoginID = req.body.UserLoginID;
    var SubjectID = req.body.SubjectID;
    var MeasurementDate = new Date(req.body.MeasurementDate * 1);
    var Latitude = req.body.Latitude;
    var Longitude = req.body.Longitude;
    var Address = req.body.Address;
    var query = "INSERT INTO "+ settings.tableNames.measurement +" (ExperimentID, UserLoginID, SubjectID, MeasurementDate, Latitude, Longitude, Address) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var data = [ExperimentID, UserLoginID, SubjectID, MeasurementDate, Latitude, Longitude, Address];

    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: {
                MeasurementID: res.insertId,
                ExperimentID: ExperimentID,
                UserLoginID: UserLoginID,
                SubjectID: SubjectID,
                MeasurementDate: MeasurementDate,
                Latitude: Latitude,
                Longitude: Longitude,
                Address: Address
            }})
        }
    })
};

module.exports.updateMeasurement = function(req, callback){
    var ID = req.params.measurementID;
    var query = "SELECT * FROM " + settings.tableNames.measurement + " WHERE ID = ?;";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var ExperimentID = req.body.ExperimentID ? req.body.ExperimentID : res[0].ExperimentID;
            var UserLoginID = req.body.UserLoginID ? req.body.UserLoginID : res[0].UserLoginID;
            var SubjectID = req.body.SubjectID ? req.body.SubjectID : res[0].SubjectID;
            var MeasurementDate = req.body.MeasurementDate ? req.body.MeasurementDate : res[0].MeasurementDate;
            var Latitude = req.body.Latitude ? req.body.Latitude : res[0].Latitude;
            var Longitude = req.body.Longitude ? req.body.Longitude : res[0].Longitude;
            var Address = req.body.Address ? req.body.Address : res[0].Address;
            var Active = typeof req.body.Active !== 'undefined' ? req.body.Active : res[0].Active;

            query = "UPDATE " + settings.tableNames.measurement + " SET ExperimentID = ?, UserLoginID = ?, SubjectID = ?, MeasurementDate = ?, Latitude = ?, Longitude = ?, Address = ?, Active = ? WHERE ID = ?;";
            args = [
                ExperimentID,
                UserLoginID,
                SubjectID,
                MeasurementDate,
                Latitude,
                Longitude,
                Address,
                Active,
                ID
            ];
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

module.exports.getAllMeasurements = function(callback){
    var query = "SELECT * from " + settings.tableNames.measurement + " ORDER BY MeasurementDate DESC;";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneMeasurement = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.measurement + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteMeasurement = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.measurement + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    })

};
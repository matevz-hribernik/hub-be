/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postDeviceType = function(req,  callback){
    var Name = req.body.Name;
    var Description = req.body.Description;
    var SensorCount = req.body.SensorCount
    var query = "INSERT INTO "+ settings.tableNames.sifDeviceType +" (Name, Description, SensorCount) VALUES (?, ?, ?)";
    var data = [Name, Description, SensorCount];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: res})
        }
    })
};

module.exports.updateDeviceType = function(req, callback){
    var ID = req.params.devicetypeID;
    var query = "SELECT * from " + settings.tableNames.sifDeviceType + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var SensorCount = req.body.SensorCount ? req.body.SensorCount : res[0].SensorCount;
            var Name = req.body.Name ? req.body.Name : res[0].Name;
            var Description = req.body.Description ? req.body.Description : res[0].Description;
            query = "UPDATE "+ settings.tableNames.sifDeviceType +" SET Name = ?, Description = ?, SensorCount = ? WHERE ID = ?;";
            args = [Name, Description, SensorCount, ID];
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

module.exports.getAllDeviceTypes = function(callback){
    var query = "SELECT * from " + settings.tableNames.sifDeviceType + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneDeviceType = function(ID, callback){
    var query = "SELECT * FROM " + settings.tableNames.sifDeviceType + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteDeviceType = function(ID, callback){
    var query = "DELETE FROM " + settings.tableNames.sifDeviceType + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        console.log(err)
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
//    //////////////////Device
module.exports.postDevice = function(req,  callback){
    var DeviceTypeID = req.body.DeviceTypeID;
    var DeviceSampleTime = Number(req.body.DeviceSampleTime);
    if (typeof DeviceSampleTime != "number") {
        callback({status:"NOK", error:"DeviceSampleTime must be a number."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.device +" (DeviceTypeID, DeviceSampleTime) VALUES (?, ?)";
        var data = [DeviceTypeID, DeviceSampleTime];
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};

module.exports.updateDevice = function(req, callback){
    var DeviceTypeID = req.body.DeviceTypeID ? req.body.DeviceTypeID : res[0].DeviceTypeID;
    var DeviceSampleTime = Number(req.body.DeviceSampleTime ? req.body.DeviceSampleTime : res[0].DeviceSampleTime);
    if (typeof DeviceSampleTime != "number") {
        callback({status:"NOK", error:"DeviceSampleTime must be a number."})
    }else{
        var ID = req.params.deviceID;
        var query = "SELECT * from " + settings.tableNames.device + " WHERE ID = ?";
        var args = [ID];
        sql.exacuteQueryWithArgs(query, args, function(err, res){
            if(err){
                callback(err);
            }else{
                query = "UPDATE "+ settings.tableNames.device +" SET DeviceTypeID = ?, DeviceSampleTime = ? WHERE ID = ?;";
                args = [DeviceTypeID, DeviceSampleTime,ID];
                sql.exacuteQueryWithArgs(query,args, function(err, result){
                    if(err){
                        callback(err);
                    }else{
                        callback(null, {status: "AOK"});
                    }
                });
            }
        });
    }



};

module.exports.getAllDevices = function(callback){
    var query = "SELECT * from " + settings.tableNames.device + ";";
    query = "SELECT device.ID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description as DeviceTypeDescription, sifdevicetype.SensorCount as DeviceTypeSenosorCount FROM `device` left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID"
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.getOneDevice = function(ID, callback){
    var query = "SELECT device.ID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description as DeviceTypeDescription, sifdevicetype.SensorCount as DeviceTypeSenosorCount FROM `device` left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID where device.ID = ?;"
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
    var query = "DELETE FROM " + settings.tableNames.device + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });
};
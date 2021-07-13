/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postDeviceSensor = function(req,  callback){
    var DeviceID = req.body.DeviceID;
    var SensorID = req.body.SensorID;
    var query = "INSERT INTO "+ settings.tableNames.deviceSensor +" (DeviceID, SensorID) VALUES (?, ?)";
    var data = [DeviceID, SensorID];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: res})
        }
    })
};

module.exports.updateDeviceSensor = function(req, callback){
    var ID = req.params.deviceSensorID;
    var query = "SELECT * from " + settings.tableNames.deviceSensor + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var DeviceID = req.body.DeviceID ? req.body.DeviceID : res[0].DeviceID;
            var SensorID = req.body.SensorID ? req.body.SensorID : res[0].SensorID;
            query = "UPDATE "+ settings.tableNames.deviceSensor +" SET DeviceID = ?, SensorID = ? WHERE ID = ?;";
            args = [DeviceID, SensorID,ID];
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

module.exports.getAllDeviceSensors = function(req, callback){
    var query = "SELECT * from " + settings.tableNames.deviceSensor + ";";
    query = "SELECT devicesensor.DeviceID, devicesensor.SensorID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description, sifdevicetype.SensorCount, sensor.SensorTypeID, sensor.Range, sifsensortype.name as SensorTypeName, sifsensortype.Description as SensorTypeDescription, sifsensortype.DOF,sifsensortype.Number FROM `devicesensor` left join device on devicesensor.DeviceID=device.ID left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID left join sensor on devicesensor.SensorID=sensor.ID left join sifsensortype on sensor.SensorTypeID = sifsensortype.ID;"

    if(typeof req.query.deviceID != 'undefined'){
        query = "SELECT devicesensor.DeviceID, devicesensor.SensorID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description, sifdevicetype.SensorCount, sensor.SensorTypeID, sensor.Range, sifsensortype.name as SensorTypeName, sifsensortype.Description as SensorTypeDescription, sifsensortype.DOF,sifsensortype.Number FROM `devicesensor` left join device on devicesensor.DeviceID=device.ID left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID left join sensor on devicesensor.SensorID=sensor.ID left join sifsensortype on sensor.SensorTypeID = sifsensortype.ID WHERE deviceID =" + req.query.deviceID + ";";
    }else if(typeof req.query.sensorID != 'undefined'){
        query = "SELECT devicesensor.DeviceID, devicesensor.SensorID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description, sifdevicetype.SensorCount, sensor.SensorTypeID, sensor.Range, sifsensortype.name as SensorTypeName, sifsensortype.Description as SensorTypeDescription, sifsensortype.DOF,sifsensortype.Number FROM `devicesensor` left join device on devicesensor.DeviceID=device.ID left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID left join sensor on devicesensor.SensorID=sensor.ID left join sifsensortype on sensor.SensorTypeID = sifsensortype.ID WHERE sensorID =" + req.query.sensorID + ";";
    }
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

//module.exports.getOneDeviceType = function(ID, callback){
//    var query = "SELECT * FROM " + settings.tableNames.de + " WHERE ID = ?;"
//    var arg = [ID];
//    sql.exacuteQueryWithArgs(query, arg, function(err, res){
//        if(!err){
//            callback(null, {status:"AOK", data:res})
//        }else{
//            callback({status:"NOK", error:err});
//        }
//    })
//};
//module.exports.deleteDeviceType = function(ID, callback){
//    var query = "DELETE FROM " + settings.tableNames.deviceSensor + " WHERE deviceID = ?;";
//    var arg = [ID];
//    sql.exacuteQueryWithArgs(query, arg, function(err, res){
//        console.log(err)
//        if(!err){
//            callback(null, {status:"AOK"})
//        }else{
//            callback({status:"NOK", error:err});
//        }
//    });
//};

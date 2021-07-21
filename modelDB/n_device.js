/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

/*var sql = require("./mysqlModel.js");
var settings = require("../settings.js");*/
var neo4j = require("./neo4jModel.js");
var settings = require("../settings.js");

module.exports.postDeviceType = function(req,  callback){
    var Name = req.body.Name;
    var Description=req.body.Description;
    var Sensor=req.body.Sensor;
    if (!Name) {
        callback({status:"NOK", error:"Name is required."})
    }else{
        var query = "MERGE (d:Device_type { name: $name,description:$description,sensor:$sensor})";
        var data = { name: Name,
                    description:Description,
                    sensor:Sensor};
        neo4j.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res});
            }
        })
    }
    /*var Name = req.body.Name;
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
    })*/
};

module.exports.updateDeviceType = function(req, callback){
    var ID =  Number(req.params.devicetypeID);
    var query = "MATCH (d:Device_type) where id(d)=$id return id(d), d.name,d.description,d.sensor";
    var args = {id: ID};
    var args2;
    var query2;
    //console.log(args)
    neo4j.exacuteQueryWithArgs_noClose(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            //console.log(res)
            param = Number(res.records[0].get("id(d)"));
            var Name = req.body.Name ? req.body.Name : res.records[0].get("d.name");
            var Description = req.body.Description ? req.body.Description : res.records[0].get("d.description");
            var Sensor = req.body.Sensor ? req.body.Sensor : res.records[0].get("d.sensor");
            query2 = "MATCH (d:Device_type) where id(d)=$id SET d.name=$name, d.description=$description, d.sensor=$sensor";
            args2 = {
                id: param,
                name:Name,
                description:Description,
                sensor:Sensor};   
        }
        neo4j.exacuteQueryWithArgs(query2,args2, function(err, result){
            if(err){
                callback(err);
            }else{
                callback(null, {status: "AOK"});
            }
        }); 
    }); 
    /*var ID = req.params.devicetypeID;
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
    });*/

};

module.exports.getAllDeviceTypes = function(callback){
    var query ="MATCH (d:Device_type) return id(d), d.name, d.description, d.sensor";
    neo4j.exacuteQuery(query, function(err, res){
        if(!err){
            //TODO ONLY what is needed in the frontend
            var res_data=[];
            res.records.forEach(device_type => {
                //console.log(subject.get("id(s)"))
                var ID = Number(device_type.get("id(d)"));
                var name = device_type.get("d.name");
                var description = device_type.get("d.description");
                var sensor = device_type.get("d.sensor");
                var d = {
                        ID: ID,
                        Name: name,
                        Description: description,
                        Sensor: sensor
                        }
                    res_data.push(d)
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    })
    /*var query = "SELECT * from " + settings.tableNames.sifDeviceType + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.getOneDeviceType = function(ID, callback){
    var query = "MATCH (d:Device_type) where ID(d)=$id return id(d), d.name, d.description, d.sensor";
    var arg = {id: Number(ID)};
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            var res_data=[];
            res.records.forEach(device_type => {
                console.log(device_type.get("id(d)"))
                var ID = Number(device_type.get("id(d)"));
                var name = device_type.get("d.name");
                var description = device_type.get("d.description");
                var sensor = device_type.get("d.sensor");
                var d = {
                        ID: ID,
                        Name: name,
                        Description: description,
                        Sensor: sensor
                        }
                    res_data.push(d)
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    })
    /*var query = "SELECT * FROM " + settings.tableNames.sifDeviceType + " WHERE ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};
module.exports.deleteDeviceType = function(ID, callback){
    var query = "MATCH (c)-[]-(n) where ID(n)=$id return count(c)";
    var arg = {id: Number(ID)}
    neo4j.exacuteQueryWithArgs_noClose(query, arg, function(err, res){
        //console.log(Number(res.records[0]._fields))
        if(!err && Number(res.records[0]._fields)<1){
            //DELETE ID only if no conncetion exists
            query2="MATCH (n: Device_type) WHERE ID(n) = $id DELETE n"
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
    /*var query = "DELETE FROM " + settings.tableNames.sifDeviceType + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        console.log(err)
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });*/
};
//    //////////////////Device
module.exports.postDevice = function(req,  callback){
    var Name= req.body.Name;
    if (!Name) {
        callback({status:"NOK", error:"Name is required."})
    }else{
        var query = "MERGE (d:Device { name: $name})";
        var data = { name: Name};
        neo4j.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res});
            }
        })
    }
    /*var DeviceTypeID = req.body.DeviceTypeID;
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
    }*/
};

module.exports.updateDevice = function(req, callback){
    var param =  Number(req.params.deviceID);
    var query = "MATCH (d:Device) where id(d)=$id return id(d), d.name";
    var args = {id: param};
    var args2;
    var query2;
    //console.log(args)
    neo4j.exacuteQueryWithArgs_noClose(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            //console.log(res)
            param = Number(res.records[0].get("id(d)"));
            var Name = req.body.Name ? req.body.Name : res.records[0].get("d.name");
            query2 = "MATCH (d:Device) where id(d)=$id SET d.name=$name";
            args2 = {
                id: param,
                name: Name};   
        }
        neo4j.exacuteQueryWithArgs(query2,args2, function(err, result){
            if(err){
                callback(err);
            }else{
                callback(null, {status: "AOK"});
            }
        }); 
    }); 
    /*var DeviceTypeID = req.body.DeviceTypeID ? req.body.DeviceTypeID : res[0].DeviceTypeID;
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
        });*/
};

module.exports.getAllDevices = function(callback){
    var query ="MATCH (d:Device) return id(d), d.name";
    neo4j.exacuteQuery(query, function(err, res){
        if(!err){
            //TODO ONLY what is needed in the frontend
            var res_data=[];
            res.records.forEach(device => {
                //console.log(subject.get("id(s)"))
                var ID = Number(device.get("id(d)"));
                var name = device.get("d.name");
                var d = {
                        ID: ID,
                        Name: name
                        }
                    res_data.push(d)
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    })
    /*var query = "SELECT * from " + settings.tableNames.device + ";";
    query = "SELECT device.ID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description as DeviceTypeDescription, sifdevicetype.SensorCount as DeviceTypeSenosorCount FROM `device` left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID"
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.getOneDevice = function(ID, callback){
    var query = "MATCH (d:Device) where ID(d)=$id return id(d), d.name";
    var arg = {id: Number(ID)};
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            var res_data=[];
            res.records.forEach(device => {
                console.log(device.get("id(d)"))
                var ID = Number(device.get("id(d)"));
                var name = device.get("d.name");
                var d = {
                        ID: ID,
                        Name: name
                        }
                    res_data.push(d)
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    })   
    /*var query = "SELECT device.ID, device.DeviceSampleTime, device.DeviceTypeID, sifdevicetype.Name as DeviceTypeName, sifdevicetype.Description as DeviceTypeDescription, sifdevicetype.SensorCount as DeviceTypeSenosorCount FROM `device` left join sifdevicetype on device.DeviceTypeID=sifdevicetype.ID where device.ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};
module.exports.deleteDevice = function(ID, callback){
    var query = "MATCH (c)-[]-(n) where ID(n)=$id return count(c)";
    var arg = {id: Number(ID)}
    neo4j.exacuteQueryWithArgs_noClose(query, arg, function(err, res){
        //console.log(Number(res.records[0]._fields))
        if(!err && Number(res.records[0]._fields)<1){
            //DELETE ID only if no conncetion exists
            query2="MATCH (n: Device) WHERE ID(n) = $id DELETE n"
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
    /*var query = "DELETE FROM " + settings.tableNames.device + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });*/
};
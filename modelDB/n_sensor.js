/**
 * Created by EkaterinaAcc on 29-Oct-16.
 */

var sql = require("./mysqlModel.js");
var settings = require("../settings.js");

module.exports.postSensorType = function(req,  callback){
    var Name = req.body.Name;
    var Description = req.body.Description;
    var DOF= req.body.DOF;
    var Unit=req.body.unit;
    if(!Name){
        callback({status:"NOK", error:"Name is required"});
    }else{
        var query = "MERGE (s:Sensor_type {name:$name, description:$description,dof:$dof,unit:$unit})";
        var data = {
            name:Name,
            description: Description,
            dof:DOF,
            unit:Unit
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
    var DOF = req.body.DOF;
    var Number = req.body.Number;

    var query = "INSERT INTO "+ settings.tableNames.sifSensorType +" (Name, Description, DOF, Number) VALUES (?, ?, ?, ?)";
    var data = [Name, Description, DOF, Number];
    sql.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: res})
        }
    })*/
};

module.exports.updateSensorType = function(req, callback){
    var ID = Number(req.params.sensortypeID);
    var query = "MATCH (s:Sensor_type) where id(s)=$id return id(s),s.name,s.description,s.dof,s.unit";
    var args={id:ID};
    var args2;
    var query2;
    neo4j.exacuteQueryWithArgs_noClose(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            param=Number(res.records[0].get("id(s)"));
            var Name=req.body.Name ? req.body.Name : res.records[0].get("s.name");
            var Description=req.body.Description ? req.body.Description : res.records[0].get("s.description");
            var DOF=req.body.DOF ? req.body.DOF : res.records[0].get("s.dof");
            var Unit=req.body.Unit ? req.body.Unit : res.records[0].get("s.unit");
            query2="MATCH (s:Sensor_type) where id(s)=$id SET s.name=$name,s.description=$description,s.dof=$dof,s.unit=$unit";
            args2={
                id: param,
                name: Name,
                description: Description,
                dof:DOF,
                unit:Unit
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
    /*var ID = req.params.sensortypeID;
    var query = "SELECT * from " + settings.tableNames.sifSensorType + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{

            var Name = req.body.Name ? req.body.Name : res[0].Name;
            var Description = req.body.Description ? req.body.Description : res[0].Description;
            var DOF = req.body.DOF ? req.body.DOF : res[0].DOF;
            var Number = req.body.Number ? req.body.Number : res[0].Number;
            query = "UPDATE "+ settings.tableNames.sifSensorType +" SET Name = ?, Description = ?, DOF = ?, Number = ? WHERE ID = ?;";
            args = [Name, Description, DOF, Number, ID];
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

module.exports.getAllSensorTypes = function(callback){
    var query="MATCH (s:Sensor_type) return id(s),s.name,s.description,s.dof,s.unit";
    neo4j.exacuteQuery(query,function(err,res){
        if(!err){
            var res_data=[];
            res.records.forEach(sensortype =>{
                var ID=Number(sensortype.get("id(s)"));
                var name=sensortype.get("s.name");
                var description=sensortype.get("s.description");
                var dof=sensortype.get("s.dof");
                var unit=sensortype.get("s.unit");
                var s= {
                    ID:ID,
                    Name:name,
                    Description:description,
                    DOF:dof,
                    Unit:unit
                };
                res_data.push(s);
            });
            callback(null,{status:"AOK",data:res_data});
        }else{
            callback({status:"NOK",error:err});
        }
    });
    /*var query = "SELECT * from " + settings.tableNames.sifSensorType + ";";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.getOneSensorType = function(ID, callback){
    var query = "MATCH (s:Sensor_type) where ID(s)=$id return id(s),s.name,s.description,s.dof,s.unit";
    var arg = {id: Number(ID)};
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            var res_data=[];
            res.records.forEach(sensortype => {
                console.log(sensortype.get("id(s)"))
                var ID = Number(sensortype.get("id(s)"));
                var name = sensortype.get("s.name");
                var description=sensortype.get("s.description");
                var dof=sensortype.get("s.dof");
                var unit=sensortype.get("s.unit");
                var s= {
                    ID:ID,
                    Name:name,
                    Description:description,
                    DOF:dof,
                    Unit:unit
                };
                res_data.push(s);
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    }) 
    /*var query = "SELECT * FROM " + settings.tableNames.sifSensorType + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.deleteSensorType = function(ID, callback){
    var query = "MATCH (c)-[]-(n) where ID(n)=$id return count(c)";
    var arg = {id: Number(ID)}
    neo4j.exacuteQueryWithArgs_noClose(query, arg, function(err, res){
        if(!err && Number(res.records[0]._fields)<1){
            //DELETE ID only if no conncetion exists
            query2="MATCH (n: Sensor_type) WHERE ID(n) = $id DELETE n"
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
    /*var query = "DELETE FROM " + settings.tableNames.sifSensorType + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });*/
};
//    //////////////////Sensor
module.exports.postSensor = function(req,  callback){
    var Range = req.body.Range;
    var BitDepth = req.body.bitDepth;
    if(!Range){
        callback({status:"NOK", error:"Range is required"});
    }else{
        var query = "MERGE (s:Sensor {range:$range, bitdepth:$bitdepth})";
        var data = {
            range:Range,
            bitdepth: BitDepth
        };
        neo4j.exacuteQueryWithArgs(query,data, function(err,res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK",data:res});
            }
        });
    }
    /*var SensorTypeID = Number(req.body.SensorTypeID);
    var Range = Number(req.body.Range);
    if (typeof Range != "number") {
        callback({status:"NOK", error:"DeviceSampleTime must be a number."})
    }else{
        var query = "INSERT INTO "+ settings.tableNames.sensor +" (SensorTypeID, `Range`) VALUES (?, ?);";
        console.log(query)
        var data = [SensorTypeID, Range];
        console.log(data)
        sql.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }*/
};

module.exports.updateSensor = function(req, callback){
    var ID = Number(req.params.sensorID);
    var query = "MATCH (s:Sensor) where id(s)=$id return id(s),s.range,s.bitdepth";
    var args={id:ID};
    var args2;
    var query2;
    neo4j.exacuteQueryWithArgs_noClose(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            param=Number(res.records[0].get("id(s)"));
            var Range=req.body.Range ? req.body.Range : res.records[0].get("s.range");
            var BitDepth=req.body.BitDepth ? req.body.BitDepth : res.records[0].get("s.bitdepth");
            query2="MATCH (s:Sensor) where id(s)=$id SET s.range=$range,s.bitdepth=$bitdepth";
            args2={
                id: param,
                range: Range,
                bitdepth: BitDepth
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
    /*var ID = req.params.sensorID;
    var query = "SELECT * from " + settings.tableNames.sensor + " WHERE ID = ?";
    var args = [ID];
    sql.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var SensorTypeID = req.body.SensorTypeID ? req.body.SensorTypeID : res[0].SensorTypeID;
            var Range = req.body.Range ? req.body.Range : res[0].Range;
            Range = Number(Range);
            if (typeof Range != "number") {
                callback({status:"NOK", error:"Range must be a number."})
            }
            query = "UPDATE "+ settings.tableNames.sensor +" SET SensorTypeID = ?, `Range` = ? WHERE ID = ?;";
            args = [SensorTypeID, Range,ID];
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

module.exports.getAllSensors = function(callback){
    var query="MATCH (s:Sensor) return id(s),s.range,s.bitdepth";
    neo4j.exacuteQuery(query,function(err,res){
        if(!err){
            var res_data=[];
            res.records.forEach(sensor =>{
                var ID=Number(sensor.get("id(s)"));
                var range=sensor.get("s.range");
                var bitdepth=sensor.get("s.bitdepth");
                var s= {
                    ID:ID,
                    Range:range,
                    BitDepth:bitdepth
                };
                res_data.push(s);
            });
            callback(null,{status:"AOK",data:res_data});
        }else{
            callback({status:"NOK",error:err});
        }
    });
    /*var query = "SELECT sensor.ID, sensor.Range, sensor.SensorTypeID, sifsensortype.Name as SensorTypeName, sifsensortype.Description as SensorTypeDescription, sifsensortype.DOF as SensorTypeDOF, sifsensortype.Number as SensorTypeNumber FROM `sensor` left join sifsensortype on sensor.SensorTypeID=sifsensortype.ID;";
    sql.exacuteQuery(query, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};

module.exports.getOneSensor = function(ID, callback){
    var query = "MATCH (s:Sensor) where ID(s)=$id return id(s),s.range,s.bitdepth";
    var arg = {id: Number(ID)};
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            var res_data=[];
            res.records.forEach(sensor => {
                console.log(sensor.get("id(s)"))
                var ID = Number(sensor.get("id(s)"));
                var range = sensor.get("s.range");
                var bitdepth=sensor.get("s.bitdepth");
                var s= {
                    ID:ID,
                    Range:range,
                    BitDepth:bitdepth
                };
                res_data.push(s);
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    }) 
    /*var query = "SELECT sensor.ID, sensor.Range, sensor.SensorTypeID, sifsensortype.Name as SensorTypeName, sifsensortype.Description as SensorTypeDescription, sifsensortype.DOF as SensorTypeDOF, sifsensortype.Number as SensorTypeNumber FROM `sensor` left join sifsensortype on sensor.SensorTypeID=sifsensortype.ID WHERE sensor.ID = ?;"
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })*/
};
module.exports.deleteSensor = function(ID, callback){
    var query = "MATCH (c)-[]-(n) where ID(n)=$id return count(c)";
    var arg = {id: Number(ID)}
    neo4j.exacuteQueryWithArgs_noClose(query, arg, function(err, res){
        if(!err && Number(res.records[0]._fields)<1){
            //DELETE ID only if no conncetion exists
            query2="MATCH (n: Sensor) WHERE ID(n) = $id DELETE n"
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
    /*var query = "DELETE FROM " + settings.tableNames.sensor + " WHERE ID = ?;";
    var arg = [ID];
    sql.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            callback(null, {status:"AOK"})
        }else{
            callback({status:"NOK", error:err});
        }
    });*/
};
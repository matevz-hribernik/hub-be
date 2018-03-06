/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */

var sql = require('../modelDB/sqlDo.js');
var user = require('../modelDB/user.js');
var login = require('../modelDB/login.js');
var experiment = require('../modelDB/experiment.js');
var device = require('../modelDB/device.js');
var deviceSensor = require('../modelDB/device-sensor.js');
var sensor = require('../modelDB/sensor.js');
var sensordata = require('../modelDB/sensordata.js');
var replicationsensor = require('../modelDB/replicationSensor.js');
var subject = require('../modelDB/subject.js');

module.exports = function(app) {

    /**
     * @api {post} /user Create a new user
     * @apiGroup Users
     * @apiParam {String} FirstName user's first name
     * @apiParam {String} LastName user's last name
     * @apiParam {String} Email user's email
     * @apiParam {String} Password user's password
     * @apiSuccess {Number} id User's id
  */
    app.post("/user", function(req,res){
        user.registerNewUser(req, function(err, found) {
            if(!err) {
                console.log(found);
                res.json(found);
            }
        });
    });
    /**
     * @api {put} /user Update an user
     * @apiGroup Users
     * @apiParam {id} id user's id
     * @apiParam {String} FirstName user's first name
     * @apiParam {String} LasttName user's last name
     * @apiParam {String} Email user's email
     * @apiParam {String} Password user's password
     * @apiParam {Bool} Admin user's admin status
     * @apiParam {Bool} Decimal point user's decimal point
     * @apiParam {String} Delimiter user's delimiter
     * @apiParam {Bool} Scatter user's scatter
     */
    app.put("/user", function(req,res){
        user.updateUser(req, function(err, found) {login
            if(!err) {
                res.json(found);
            }
        });
    });
    /**
     * @api {get} /user/:Email Get an user
     * @apiGroup Users
     * @apiParam {String} Email user's email
     */
    app.get("/user/:Email", function(req,res){
        var Email = req.params.Email;
        console.log(Email)
        user.returnUserIfUserExists(Email, function(err, found) {
            if(!err) {
                res.json({status:"AOK", data:found});
            }else{
                res.json({status:"NOK", error: err});
            }
        });
    });
    /**
     * @api {get} /users Get an user list
     * @apiGroup Users
     *
     */
    app.get("/users", function(req,res){
        user.getAllUsers(function(err, found){
           if(err){
               res.json({status:"NOK", error: err});
           } else{
               res.json({status:"AOK", data:found});
           }
        });
    });

//LOGIN

    /**
     * @api {post} /user-login Create a new user-login
     * @apiGroup User-login
     * @apiParam {String} Email user's Email
     * @apiParam {String} Password user's Password
     * @apiParam {String} PhoneID user's PhoneID
     * @apiParam {String} PhoneName user's PhoneName
     */
    app.post("/user-login", function(req,res){
        login.userLogin(req, function(err, found) {
            if(!err) {
                res.json(found);
            }else{
                res.json({error: err})
            }
        });
    });
    /**
     * @api {put} /user-login Update an user-login
     * @apiGroup User-login
     * @apiParam {id} ID user-login id
     */
    app.put("/user-login/:ID", function(req,res){
        login.updateUserLogOnDisconect(req.body, function(err, found) {
            if(!err) {
                res.json(found);
            }else{
               res.json({status:"NOK", error:err});
            }
        });
    });

    /**
     * @api {get} /user-login by email Get an user-login
     * @apiGroup User-login
     * @apiParam {String} Email user's email
     */
    app.get("/user-login/:userId", function(req,res){
        var ID = req.params.userId;
        login.getAllUsersLogins(ID, function(err, found) {
            if(!err) {
                res.json(found);
            }else{
                res.json( {status:"NOK", error: err});
            }
        });
    });
    /**
     * @api {get} /user-login Get  user-login list
     * @apiGroup User-login
     */
    app.get("/user-login", function(req,res){
        login.getAllUsers(function(err, found){
            if(err){
                res.json({status:"NOK", error: err});
            } else{
                res.json(null,{status:"AOK", data:found});
            }
        });
    });



    /**
     * @api {post} /experiments Create a new experiment
     * @apiGroup Experiment
     * @apiParam {String} Name user's Name
     * @apiParam {String} Description user's Description
     */
    app.post("/experiments", function(req,res){
        experiment.postExperiment(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /experiments/:experimentID Update an experiment
     * @apiGroup Experiment
     * @apiParam {String} Name user's Name
     * @apiParam {String} Description user's Description
     */
    app.put("/experiments/:experimentID", function(req,res){
        experiment.updateExperiment(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /experiments/:experimentID Get experiment by Id
     * @apiGroup Experiment
     */
    app.get("/experiments/:experimentID", function(req,res){
        var ID = req.params.experimentID;
        console.log(ID)
        experiment.getOneExperiment(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /experiments Get an experiment list
     * @apiGroup Experiment
     */
    app.get("/experiments", function(req,res){
        experiment.getAllExperiments(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /experiments/:experimentID Delete an experiment by ID
     * @apiGroup Experiment
     */
    app.delete("/experiments/:experimentID", function(req,res){
        console.log(req.body)
        console.log(req.params)

        var ID = req.params.experimentID;
        console.log(ID)

        experiment.deleteExperiment(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

//////////////////////////////////// DeviceType////////////////////////////
    /**
     * @api {post} /devicetypes Create a new sifdevicetype
     * @apiGroup device
     * @apiParam {String} Name devicetype's Name
     * @apiParam {String} Description devicetype's Description
     */
    app.post("/devicetypes", function(req,res){
        device.postDeviceType(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /devicetypes/:devicetypeID Update an devicetype
     * @apiGroup device
     * @apiParam {String} Name devicetype's Name
     * @apiParam {String} Description devicetypes's Description
     */
    app.put("/devicetypes/:devicetypeID", function(req,res){
        device.updateDeviceType(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /devicetypes/:devicetypeID by ID
     * @apiGroup device
     */
    app.get("/devicetypes/:devicetypeID", function(req,res){
        var ID = req.params.devicetypeID;
        console.log(req.params);
        device.getOneDeviceType(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /devicetypes Get  devicetype list
     * @apiGroup device
     */
    app.get("/devicetypes", function(req,res){
        device.getAllDeviceTypes(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /devicetypes/:devicetypeID Delete an devicetypes by ID
     * @apiGroup device
     */
    app.delete("/devicetypes/:devicetypeID", function(req,res){

        var ID = req.params.devicetypeID;
        device.deleteDeviceType(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    ///////////////////////////////////Device
    /**
     * @api {post} /device Create a new device
     * @apiGroup device
     * @apiParam {Number} DeviceTypeID device's TypeId
     * @apiParam {Number} DeviceSampleTime device's Sample time
     */
    app.post("/device", function(req,res){
        device.postDevice(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /device/:devicetypeID Update  device
     * @apiGroup device
     * @apiParam {String} DeviceTypeID device's TypeId
     * @apiParam {String} DeviceSampleTime device's Sample Time
     */
    app.put("/device/:deviceID", function(req,res){
        device.updateDevice(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /device/deviceID by ID
     * @apiGroup device
     */
    app.get("/device/:deviceID", function(req,res){
        var ID = req.params.deviceID;
        device.getOneDevice(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /device Get an device list
     * @apiGroup device
     */
    app.get("/device", function(req,res){
        device.getAllDevices(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /device/:deviceID Delete an device by ID
     * @apiGroup device
     */
    app.delete("/device/:deviceID", function(req,res){
        var ID = req.params.deviceID;
        device.deleteDevice(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });


    ///////////////////////////////////Device-sensor
    /**
     * @api {post} /device/sensor Create a new device-sensor
     * @apiGroup device-sensor
     * @apiParam {Number} DeviceID device's ID
     * @apiParam {Number} SensorID sensor's ID
     */
    app.post("/devicesensor", function(req,res){
        deviceSensor.postDeviceSensor(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /devicesensor/:deviceSensorID Update an device sensor
     * @apiGroup device-sensor
     * @apiParam {String} DeviceID device's ID
     * @apiParam {String} SensorID sensor's ID
     */
    app.put("/devicesensor/:sensorID", function(req,res){
        deviceSensor.updateDeviceSensor(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /device/sensor/deviceID by ID Get all device
     * @apiGroup device-sensor
     */
    app.get("/devicesensor/:deviceID", function(req,res){
        var ID = req.params.deviceID;

        deviceSensor.getOneDevice(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /device/sensor Get an device list
     * @apiGroup device-sensor
     */
    app.get("/devicesensor", function(req,res){
        deviceSensor.getAllDeviceSensors(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
//    /////////////////////////// Sensor
    /**
     * @api {post} /device Create a new sensor
     * @apiGroup sensor
     * @apiParam {Number} SensorTypeId sensor's SensorTypeId
     * @apiParam {Number} Range sensor's Range
     */
    app.post("/sensor", function(req,res){
        sensor.postSensor(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /sensor/:sensorID Update an device
     * @apiGroup sensor
     * @apiParam {String} Range sensor's Range
     */
    app.put("/sensor/:sensorID", function(req,res){
        sensor.updateSensor(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /sensor/sensorID by ID
     * @apiGroup sensor
     */
    app.get("/sensor/:sensorID", function(req,res){
        //console.log(req)
        var ID = req.params.sensorID;
        sensor.getOneSensor(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /sensor Get an sensor list
     * @apiGroup sensor
     */
    app.get("/sensor", function(req,res){
        sensor.getAllSensors(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /sensor/:sensorID Delete an sensor by sensorID
     * @apiGroup sensor
     */
    app.delete("/sensor/:sensorID", function(req,res){
        var ID = req.params.sensorID;
        sensor.deleteSensor(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        });
    });
////////////////////////////////sensorType////////////////////////////////
    /**
     * @api {post} /sensortypes Create a new sifSensorType
     * @apiGroup sensortypes
     * @apiParam {String} Name sensortype's Name
     * @apiParam {String} Description sensortype's Description
     * @apiParam {String} DOF sensortype's DOF
     * @apiParam {String} Number sensortype's Number
     */
    app.post("/sensortypes", function(req,res){
        sensor.postSensorType(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /sensortypes/:sensortypeID Update an sensortype
     * @apiGroup sensortypes
     * @apiParam {String} Name sensortype's Name
     * @apiParam {String} Description sensortype's Description
     * @apiParam {String} DOF sensortype's DOF
     * @apiParam {String} Number sensortype's Number
     */
    app.put("/sensortypes/:sensortypeID", function(req,res){
        sensor.updateSensorType(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /sensortypes by ID Get all sensortypes
     * @apiGroup sensortypes
     */
    app.get("/sensortypes/:sensortypeID", function(req,res){
        var ID = req.params.sensortypeID;
        sensor.getOneSensorType(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /sensortypes Get an sensortypes list
     * @apiGroup sensortypes
     */
    app.get("/sensortypes", function(req,res){
        sensor.getAllSensorTypes(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /sensortypes/:sensortypeID Delete an sensortypes by ID
     * @apiGroup sensortypes
     */
    app.delete("/sensortypes/:sensortypeID", function(req,res){

        var ID = req.params.sensortypeID;
        sensor.deleteSensorType(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

//    SENSORDATA
    /**
     * @api {post} /sensordata Create a new sensordata
     * @apiGroup sensordata
     * @apiParam {ID} ReplicationSensorID sensordata's ReplicationSensorID
     * @apiParam {String} TimeStamp sensordata's TimeStamp
     * @apiParam {String} DOF1 sensordata's DOF1
     * @apiParam {String} DOF2 sensordata's DOF2
     * @apiParam {String} DOF3 sensordata's DOF3
     */
    app.post("/sensordata", function(req,res){
        sensordata.postSensorData(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /sensordata/:ReplicationSensorID by ReplicationSensorID Get all sensordata
     * @apiGroup sensordata
     */
    app.get("/sensordata/:ReplicationSensorID", function(req,res){
        var ID = req.params.ReplicationSensorID;
        sensordata.getSensorDataByReplicationSensorID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /sensordata Get an sensordata list
     * @apiGroup sensordata
     */
    app.get("/sensordata", function(req,res){
        sensordata.getAllSensorData(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /sensordata/:ReplicationSensorID Delete an sensordata by ReplicationSensorID
     * @apiGroup sensordata
     */
    app.delete("/sensordata/:ReplicationSensorID", function(req,res){

        var ID = req.params.ReplicationSensorID;
        sensordata.deleteSensorByReplicationSensorID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

    //    REPLICATION SENSOR
    /**
     * @api {post} /replicationsensor Create a new replicationsensor
     * @apiGroup replicationsensor
     * @apiParam {ID} ExperimentID replicationsensor's ExperimentID
     * @apiParam {String} DeviceID replicationsensor's DeviceID
     * @apiParam {String} SensorID replicationsensor's SensorID
     * @apiParam {String} ReplicationID replicationsensor's ReplicationID
     * @apiParam {String} SampleTime replicationsensor's SampleTime
     * @apiParam {String} MetaData replicationsensor's MetaData
     */
    app.post("/replicationsensor", function(req,res){
        replicationsensor.postReplicationSensor(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /replicationsensor/:ID by ID
     * @apiGroup replicationsensor
     */
    app.get("/replicationsensor/:ID", function(req,res){
        var ID = req.params.ID;
        replicationsensor.getReplicationSensorByID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /replicationsensor Get an replicationsensor list
     * @apiGroup replicationsensor
     */
    app.get("/replicationsensor", function(req,res){
        replicationsensor.getAllReplicationSensor(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /replicationsensor/:ID Delete an replicationsensor by ID
     * @apiGroup replicationsensor
     */
    app.delete("/replicationsensor/:ID", function(req,res){

        var ID = req.params.ID;
        replicationsensor.deleteReplicationSensorByID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

        //   subject
    /**
     * @api {post} /subject Create a new subject
     * @apiGroup subject
     * @apiParam {String} FirstName subject's FirstName
     * @apiParam {String} LastName subject's LastName
     * @apiParam {String} Remark subject's Remark
     */
    app.post("/subject", function(req,res){
        subject.postSubject(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /subject/:subjectID by ID
     * @apiGroup subject
     */
    app.get("/subject/:subjectID", function(req,res){
        var ID = req.params.subjectID;
        subject.getSubjectByID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /subject Get an subject list
     * @apiGroup subject
     */
    app.get("/subject", function(req,res){
        subject.getAllSubject(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /subject/:subjectID Delete an subject by ID
     * @apiGroup subject
     */
    app.delete("/subject/:subjectID", function(req,res){

        var ID = req.params.subjectID;
        subject.deleteSubjectByID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });

      /**
     * @api {put} /subject/:subjectID Update an subject
     * @apiGroup subject
     * @apiParam {String} FirstName subject's FirstName
     * @apiParam {String} LastName subject's LastName
     * @apiParam {String} Remark subject's Remark
     */
    app.put("/subject/:subjectID", function(req,res){
        subject.updateSubject(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });



};
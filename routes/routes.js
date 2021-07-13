var user = require('../modelDB/user.js');
var login = require('../modelDB/login.js');
var experiment = require('../modelDB/experiment.js');
var measurement = require('../modelDB/measurement.js');
var device = require('../modelDB/device.js');
var deviceSensor = require('../modelDB/device-sensor.js');
var sensor = require('../modelDB/sensor.js');
var sensordata = require('../modelDB/sensordata.js');
var replicationsensor = require('../modelDB/replicationSensor.js');
var subject = require('../modelDB/subject.js');
var replication = require('../modelDB/replication');

var n_subject = require('../modelDB/n_subject.js');


module.exports = function(app) {

    //   NEW NEO4J SUBJECT_______________________________________________________________________________________
    /**
     * @api {post} /subject Create a new subject
     * @apiGroup subject
     */
    app.post("/api/subject", function(req,res){
        n_subject.postSubject(req, function(err, result){
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
    app.get("/api/subject/:subjectID", function(req,res){
        var ID = req.params.subjectID;
        n_subject.getSubjectByID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });

    app.get("/api/subject/by/:field/:tearms", function(req,res){
        var field = req.params.field;
        var tearms = req.params.tearms;
        n_subject.getSubjectBy([ field, tearms], function(err, result){
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
    app.get("/api/subject", function(req,res){
        n_subject.getAllSubject(function(err, result){
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
    app.delete("/api/subject/:subjectID", function(req,res){

        var ID = req.params.subjectID;
        n_subject.deleteSubjectByID(ID, function(err, result){
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
     */
    app.put("/api/subject/:subjectID", function(req,res){
        n_subject.updateSubject(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
     /**
     * @api {post} /api/subject/measurment Update an subjectmeasurment
     * @apiGroup subject
     */   
    app.post("/api/subject/measurment", function(req,res){
        n_subject.newSubjectMeasurment(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    app.put("/api/subject/measurment/:subjectmeasurmentID", function(req,res){
        var id = req.params.subjectmeasurmentID
        n_subject.updateSubjectMeasurment(id, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    app.get("/api/subject/measurment/:subjectID", function(req,res){
        var id = req.params.subjectID
        n_subject.getAllSubjectMeasurmentBySubjectID(id, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //   Old MySQL Subject====================================================================================
    
    /**
     * @api {post} /subject Create a new subject
     * @apiGroup subject
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

    app.get("/subject/by/:field/:tearms", function(req,res){
        var field = req.params.field;
        var tearms = req.params.tearms;
        subject.getSubjectBy([ field, tearms], function(err, result){
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
     /**
     * @api {post} /api/subject/measurment Update an subjectmeasurment
     * @apiGroup subject
     */   
    app.post("/subject/measurment", function(req,res){
        subject.newSubjectMeasurment(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    app.put("/subject/measurment/:subjectmeasurmentID", function(req,res){
        var id = req.params.subjectmeasurmentID
        subject.updateSubjectMeasurment(id, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    app.get("/subject/measurment/:subjectID", function(req,res){
        var id = req.params.subjectID
        subject.getAllSubjectMeasurmentBySubjectID(id, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    require('./config/replicationMetaData')(app);
    
    
    //NEW Neo4j User__________________________________________________________________________________________________________
    /**
     * @api {post} /user Create a new user
     * @apiGroup Users
     * @apiParam {String} FirstName user's first name
     * @apiParam {String} LastName user's last name
     * @apiParam {String} Email user's email
     * @apiParam {String} Password user's password
     * @apiSuccess {Number} id User's id
  */
     app.post("/api/users", function(req,res){
        n_user.registerNewUser(req, function(err, found, code) {
            if(!err) {
                res.json(found);
            } else {
                res.status(code || 500).json(err);
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
    app.put("/api/users/:ID", function(req, res){
        n_user.updateUser(req, function(err, found, code) {
            if(!err) {
                found.Password = undefined;
                res.json(found);
            } else {
                res.status(code || 500).json(err);
            }
        });
    });
    /**
     * @api {get} /user/:ID Get an user
     * @apiGroup Users
     * @apiParam {String} ID user's ID
     */
    app.get("/api/users/:ID", function(req,res){
        var ID = req.params.ID;
        n_user.GetUserById(ID, function(err, found, code) {
            if(!err) {
                found.Password = undefined;
                res.json(found);
            }else{
                res.status(code || 500).json(err);
            }
        });
    });
    /**
     * @api {get} /users Get an user list
     * @apiGroup Users
     *
     */
    app.get("/api/users", function(req,res){
        n_user.getAllUsers(function(err, found, code){
           if(err){
               res.status(code || 500).json(err);
           } else{
               res.json(found);
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
    app.post("/api/user-login", function(req,res){
        n_login.userLogin(req, function(err, found, code) {
            if(!err) {
                res.json(found);
            }else{
                res.status(code || 500).json(err);
            }
        });
    });
    /**
     * @api {put} /user-login Update an user-login
     * @apiGroup User-login
     * @apiParam {id} ID user-login id
     */
    app.put("/api/user-login/:ID", function(req,res){
        n_login.updateUserLogOnDisconect(req.body, function(err, found) {
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
    app.get("/api/user-login/:userId", function(req,res){
        var ID = req.params.userId;
        n_login.getAllUsersLogins(ID, function(err, found) {
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
    app.get("/api/user-login", function(req,res){
        n_login.getAllUsers(function(err, found){
            if(err){
                res.json({status:"NOK", error: err});
            } else{
                res.json(null,{status:"AOK", data:found});
            }
        });
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Old MySQL User===============================================================================================================
    /**
     * @api {post} /user Create a new user
     * @apiGroup Users
     * @apiParam {String} FirstName user's first name
     * @apiParam {String} LastName user's last name
     * @apiParam {String} Email user's email
     * @apiParam {String} Password user's password
     * @apiSuccess {Number} id User's id
  */
    app.post("/users", function(req,res){
        user.registerNewUser(req, function(err, found, code) {
            if(!err) {
                res.json(found);
            } else {
                res.status(code || 500).json(err);
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
    app.put("/users/:ID", function(req, res){
        user.updateUser(req, function(err, found, code) {
            if(!err) {
                found.Password = undefined;
                res.json(found);
            } else {
                res.status(code || 500).json(err);
            }
        });
    });
    /**
     * @api {get} /user/:ID Get an user
     * @apiGroup Users
     * @apiParam {String} ID user's ID
     */
    app.get("/users/:ID", function(req,res){
        var ID = req.params.ID;
        user.GetUserById(ID, function(err, found, code) {
            if(!err) {
                found.Password = undefined;
                res.json(found);
            }else{
                res.status(code || 500).json(err);
            }
        });
    });
    /**
     * @api {get} /users Get an user list
     * @apiGroup Users
     *
     */
    app.get("/users", function(req,res){
        user.getAllUsers(function(err, found, code){
           if(err){
               res.status(code || 500).json(err);
           } else{
               res.json(found);
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
        login.userLogin(req, function(err, found, code) {
            if(!err) {
                res.json(found);
            }else{
                res.status(code || 500).json(err);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NEW NEO4J Activity______________________________________________________________________________________________
    /**
     * @api {post} /activities Create a new experiment
     * @apiGroup Activities
     * @apiParam {String} Name user's Name
     * @apiParam {String} Description user's Description
     */
     app.post("/api/activities", function(req,res){
        n_activity.postActivity(req, function(err, result){
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
    app.put("/api/activities/:activityID", function(req,res){
        n_activity.updateActivity(req, function(err, result){
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
    app.get("/api/activities/:activityID", function(req,res){
        var ID = req.params.activityID;
        n_activity.getOneActivity(ID, function(err, result){
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
    app.get("/api/activities", function(req,res){
        n_activity.getAllActivities(function(err, result){
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
    app.delete("/api/activities/:experimentID", function(req,res){
        var ID = req.params.experimentID;
        n_activity.deleteActivity(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NEW NEO4J experiments_____________________________________________________________________________________________
    /**
     * @api {post} /experiments Create a new experiment
     * @apiGroup Experiment
     * @apiParam {String} Name user's Name
     * @apiParam {String} Description user's Description
     */
     app.post("/api/experiments", function(req,res){
        n_experiment.postExperiment(req, function(err, result){
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
    app.put("/api/experiments/:experimentID", function(req,res){
        n_experiment.updateExperiment(req, function(err, result){
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
    app.get("/api/experiments/:experimentID", function(req,res){
        var ID = req.params.experimentID;
        n_experiment.getOneExperiment(ID, function(err, result){
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
    app.get("/api/experiments", function(req,res){
        n_experiment.getAllExperiments(function(err, result){
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
    app.delete("/api/experiments/:experimentID", function(req,res){
        var ID = req.params.experimentID;
        n_experiment.deleteExperiment(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL experiments===========================================================================================
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
        var ID = req.params.experimentID;
        experiment.deleteExperiment(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NEW NEO4J measurments_____________________________________________________________________________________
 /**
     * @api {post} /measurements Create a new measurement
     * @apiGroup Measurement
     * @apiParam {String} ExperimentID Experiment ID
     * @apiParam {String} UserLoginId User Login Id
     * @apiParam {String} SubjectId Subject Id
     * @apiParam {String} MeasurementDate Measurement Date
     * @apiParam {String} Latitude Latitude
     * @apiParam {String} Longitude Longitude
     * @apiParam {String} Address Address
     */
  app.post("/api/measurements", function(req,res){
    n_measurement.postMeasurement(req, function(err, result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
});
/**
 * @api {put} /measurements/:measurementID Update an measurement
 * @apiGroup Measurement
 * @apiParam {String} ExperimentID Experiment ID
 * @apiParam {String} UserLoginId User Login Id
 * @apiParam {String} SubjectId Subject Id
 * @apiParam {String} MeasurementDate Measurement Date
 * @apiParam {String} Latitude Latitude
 * @apiParam {String} Longitude Longitude
 * @apiParam {String} Address Address
 */
app.put("/api/measurements/:measurementID", function(req,res){
    console.log('Updateamo')
    n_measurement.updateMeasurement(req, function(err, result){
        if(err){
            res.json({error:err});
        }else{
            console.log('Update measurement', result)
            res.json(result);
        }
    })
});

/**
 * @api {get} /measurements/:experimentID Get experiment by Id
 * @apiGroup Measurement
 */
app.get("/api/measurements/:measurementID", function(req,res){
    var ID = req.params.measurementID;
    n_measurement.getOneMeasurement(ID, function(err, result){
        if(err){
            res.json({error:err});
        }else{
            res.json(result);
        }
    })

});
/**
 * @api {get} /measurements Get a experiment list
 * @apiGroup Measurement
 */
app.get("/api/measurements", function(req,res){
    n_measurement.getAllMeasurements(function(err, result){
        if(err){
            res.json({error:err});
        }else{
            res.json(result);
        }
    })
});
/**
 * @api {delete} /measurements/:measurementID Delete a measurement by ID
 * @apiGroup Measurement
 */
app.delete("/api/measurements/:measurementID", function(req,res){
    var ID = req.params.measurementID;
    n_measurement.deleteMeasurement(ID, function(err, result){
        if(err){
            res.json({error:err});
        }else{
            res.json(result);
        }
    })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL measurments==============================================================================
 /**
     * @api {post} /measurements Create a new measurement
     * @apiGroup Measurement
     * @apiParam {String} ExperimentID Experiment ID
     * @apiParam {String} UserLoginId User Login Id
     * @apiParam {String} SubjectId Subject Id
     * @apiParam {String} MeasurementDate Measurement Date
     * @apiParam {String} Latitude Latitude
     * @apiParam {String} Longitude Longitude
     * @apiParam {String} Address Address
     */
    app.post("/measurements", function(req,res){
        measurement.postMeasurement(req, function(err, result){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {put} /measurements/:measurementID Update an measurement
     * @apiGroup Measurement
     * @apiParam {String} ExperimentID Experiment ID
     * @apiParam {String} UserLoginId User Login Id
     * @apiParam {String} SubjectId Subject Id
     * @apiParam {String} MeasurementDate Measurement Date
     * @apiParam {String} Latitude Latitude
     * @apiParam {String} Longitude Longitude
     * @apiParam {String} Address Address
     */
    app.put("/measurements/:measurementID", function(req,res){
        console.log('Updateamo')
        measurement.updateMeasurement(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                console.log('Update measurement', result)
                res.json(result);
            }
        })
    });

    /**
     * @api {get} /measurements/:experimentID Get experiment by Id
     * @apiGroup Measurement
     */
    app.get("/measurements/:measurementID", function(req,res){
        var ID = req.params.measurementID;
        measurement.getOneMeasurement(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /measurements Get a experiment list
     * @apiGroup Measurement
     */
    app.get("/measurements", function(req,res){
        measurement.getAllMeasurements(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /measurements/:measurementID Delete a measurement by ID
     * @apiGroup Measurement
     */
    app.delete("/measurements/:measurementID", function(req,res){
        var ID = req.params.measurementID;
        measurement.deleteMeasurement(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////

    // NEW NEO4J DeviceType_______________________________________________________________________________
    /**
     * @api {post} /devicetypes Create a new sifdevicetype
     * @apiGroup device
     * @apiParam {String} Name devicetype's Name
     * @apiParam {String} Description devicetype's Description
     */
     app.post("/api/devicetypes", function(req,res){
        n_device.postDeviceType(req, function(err, result){
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
    app.put("/api/devicetypes/:devicetypeID", function(req,res){
        n_device.updateDeviceType(req, function(err, result){
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
    app.get("/api/devicetypes/:devicetypeID", function(req,res){
        var ID = req.params.devicetypeID;
        n_device.getOneDeviceType(ID, function(err, result){
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
    app.get("/api/devicetypes", function(req,res){
        n_device.getAllDeviceTypes(function(err, result){
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
    app.delete("/api/devicetypes/:devicetypeID", function(req,res){

        var ID = req.params.devicetypeID;
        n_device.deleteDeviceType(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // OLD MySQL DeviceType===================================================================================
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NEW NEO4J Device_______________________________________________________________________________________
    /**
     * @api {post} /device Create a new device
     * @apiGroup device
     * @apiParam {Number} DeviceTypeID device's TypeId
     * @apiParam {Number} DeviceSampleTime device's Sample time
     */
     app.post("/api/device", function(req,res){
        n_device.postDevice(req, function(err, result){
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
    app.put("/api/device/:deviceID", function(req,res){
        n_device.updateDevice(req, function(err, result){
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
    app.get("/api/device/:deviceID", function(req,res){
        var ID = req.params.deviceID;
        n_device.getOneDevice(ID, function(err, result){
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
    app.get("/api/device", function(req,res){
        n_device.getAllDevices(function(err, result){
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
    app.delete("/api/device/:deviceID", function(req,res){
        var ID = req.params.deviceID;
        n_device.deleteDevice(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL Device============================================================================================
    /**
     * @api {post} /device Create a new device
     * @apiGroup device
     * @apiParam {Number} DeviceTypeID device's TypeId
     * @apiParam {Number} DeviceSampleTime device's Sample time
     */
    //add so that sensor conncetions are added in this functions 

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NEW NEO4J Device-sensor____________________________________________________________________________________
    //will not be used, implemented in device. 
    /**
     * @api {post} /device/sensor Create a new device-sensor
     * @apiGroup device-sensor
     * @apiParam {Number} DeviceID device's ID
     * @apiParam {Number} SensorID sensor's ID
     */
     app.post("/api/devicesensor", function(req,res){
        n_deviceSensor.postDeviceSensor(req, function(err, result){
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
    app.put("/api/devicesensor/:sensorID", function(req,res){
        n_deviceSensor.updateDeviceSensor(req, function(err, result){
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
    app.get("/api/devicesensor/:deviceID", function(req,res){
        var ID = req.params.deviceID;

        n_deviceSensor.getOneDevice(ID, function(err, result){
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
    app.get("/api/devicesensor", function(req,res){
        n_deviceSensor.getAllDeviceSensors(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL Device-sensor=========================================================================================
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NEW NEO4J Sensor____________________________________________________________________________________
    /**
     * @api {post} /device Create a new sensor
     * @apiGroup sensor
     * @apiParam {Number} SensorTypeId sensor's SensorTypeId
     * @apiParam {Number} Range sensor's Range
     */
     app.post("/api/sensor", function(req,res){
        n_sensor.postSensor(req, function(err, result){
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
    app.put("/api/sensor/:sensorID", function(req,res){
        n_sensor.updateSensor(req, function(err, result){
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
    app.get("/api/sensor/:sensorID", function(req,res){
        var ID = req.params.sensorID;
        n_sensor.getOneSensor(ID, function(err, result){
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
    app.get("/api/sensor", function(req,res){
        n_sensor.getAllSensors(function(err, result){
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
    app.delete("/api/sensor/:sensorID", function(req,res){
        var ID = req.params.sensorID;
        n_sensor.deleteSensor(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        });
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL Sensor===============================================================================================
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    // New NEO4J sensorType___________________________________________________________________________________________
    /**
     * @api {post} /sensortypes Create a new sifSensorType
     * @apiGroup sensortypes
     * @apiParam {String} Name sensortype's Name
     * @apiParam {String} Description sensortype's Description
     * @apiParam {String} DOF sensortype's DOF
     * @apiParam {String} Number sensortype's Number
     */
     app.post("/api/sensortypes", function(req,res){
        n_sensor.postSensorType(req, function(err, result){
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
    app.put("/api/sensortypes/:sensortypeID", function(req,res){
        n_sensor.updateSensorType(req, function(err, result){
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
    app.get("/api/sensortypes/:sensortypeID", function(req,res){
        var ID = req.params.sensortypeID;
        n_sensor.getOneSensorType(ID, function(err, result){
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
    app.get("/api/sensortypes", function(req,res){
        n_sensor.getAllSensorTypes(function(err, result){
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
    app.delete("/api/sensortypes/:sensortypeID", function(req,res){

        var ID = req.params.sensortypeID;
        n_sensor.deleteSensorType(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL sensorType===========================================================================================
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
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   // New NEO4J SENSORDATA__________________________________________________________________________________________
    /**
     * @api {post} /sensordata Create a new sensordata
     * @apiGroup sensordata
     * @apiParam {ID} ReplicationSensorID sensordata's ReplicationSensorID
     * @apiParam {String} TimeStamp sensordata's TimeStamp
     * @apiParam {String} DOF1 sensordata's DOF1
     * @apiParam {String} DOF2 sensordata's DOF2
     * @apiParam {String} DOF3 sensordata's DOF3
     */
     app.post("/api/sensordata", function(req,res){
        n_sensordata.postSensorData(req, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /sensordata/:ReplicationID by ReplicationID (measument) Get all sensordata
     * @apiGroup sensordata
     */
    app.get("/api/sensordata/:ReplicationID", function(req,res){
        var ID = req.params.ReplicationID;
        n_sensordata.getSensorDataByReplicationID(ID, function(err, result){
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
    //will not be used
    app.get("/api/sensordata", function(req,res){
        n_sensordata.getAllSensorData(function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /sensordata/:ReplicationID Delete an sensordata by ReplicationID
     * @apiGroup sensordata
     */
    app.delete("/api/sensordata/:ReplicationID", function(req,res){

        var ID = req.params.ReplicationID;
        n_sensordata.deleteSensorByReplicationID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL SENSORDATA==========================================================================================
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
     * @api {get} /sensordata/:ReplicationID by ReplicationID Get all sensordata
     * @apiGroup sensordata
     */
    app.get("/sensordata/:ReplicationID", function(req,res){
        var ID = req.params.ReplicationID;
        sensordata.getSensorDataByReplicationID(ID, function(err, result){
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
     * @api {delete} /sensordata/:ReplicationID Delete an sensordata by ReplicationID
     * @apiGroup sensordata
     */
    app.delete("/sensordata/:ReplicationID", function(req,res){

        var ID = req.params.ReplicationID;
        sensordata.deleteSensorByReplicationID(ID, function(err, result){
            if(err){
                res.json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL REPLICATION SENSOR===================================================================================
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Old MySQL REPLICATION===========================================================================================
    /**
     * @api {post} /replications Create a new replication
     * @apiGroup replication
     * @apiParam {String} FirstName replication's FirstName
     * @apiParam {String} LastName replication's LastName
     * @apiParam {String} Remark replication's Remark
     */
    app.post("/replications", function(req,res){
        replication.postReplication(req, function(err, result, err){
            if(err){
                res.status(code || 500).json(err);
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /replications/:replicationID by ID
     * @apiGroup replication
     */
    app.get("/replications/:replicationID", function(req,res){
        var ID = req.params.replicationID;
        replication.getOneReplication(ID, function(err, result, code){
            if(err){
                res.status(code || 500).json(err);
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /replications Get an replication list
     * @apiGroup replication
     */
    app.get("/replications", function(req,res){
        replication.getAllReplications(req.query, function(err, result, code){
            console.log(err, result, code)
            if(err){
                res.status(code || 500).json(err);
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {delete} /replications/:replicationID Delete an replication by ID
     * @apiGroup replication
     */
    app.delete("/replications/:replicationID", function(req,res){

        var ID = req.params.replicationID;
        replication.deleteReplicationByID(ID, function(err, result, status){
            if(err){
                res.status(code || 500).json(err);
            }else{
                res.json(result);
            }
        })
    });

      /**
     * @api {put} /replications/:replicationID Update an replication
     * @apiGroup replication
     * @apiParam {String} FirstName replication's FirstName
     * @apiParam {String} LastName replication's LastName
     * @apiParam {String} Remark replication's Remark
     */
    app.put("/replications/:replicationID", function(req,res){
        replication.updateReplication(req, function(err, result, code){
                console.log(err, result, code)
            if (err){
                res.status(code || 500).json(err);
            }else{
                res.json(result);
            }
        })
    });



};
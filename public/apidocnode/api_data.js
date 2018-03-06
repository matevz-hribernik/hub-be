define({ "api": [
  {
    "type": "delete",
    "url": "/experiments/:experimentID",
    "title": "Delete an experiment by ID",
    "group": "Experiment",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Experiment",
    "name": "DeleteExperimentsExperimentid"
  },
  {
    "type": "get",
    "url": "/experiments",
    "title": "by ID Get all experiments",
    "group": "Experiment",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Experiment",
    "name": "GetExperiments"
  },
  {
    "type": "get",
    "url": "/experiments/:experimentID",
    "title": "Get an experiment list",
    "group": "Experiment",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Experiment",
    "name": "GetExperimentsExperimentid"
  },
  {
    "type": "post",
    "url": "/experiments",
    "title": "Create a new experiment",
    "group": "Experiment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>user's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>user's Description</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Experiment",
    "name": "PostExperiments"
  },
  {
    "type": "put",
    "url": "/experiments/:experimentID",
    "title": "Update an experiment",
    "group": "Experiment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>user's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>user's Description</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Experiment",
    "name": "PutExperimentsExperimentid"
  },
  {
    "type": "get",
    "url": "/user-login",
    "title": "Get  user-login list",
    "group": "User_login",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User_login",
    "name": "GetUserLogin"
  },
  {
    "type": "get",
    "url": "/user-login",
    "title": "by email Get an user-login",
    "group": "User_login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>user's email</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User_login",
    "name": "GetUserLogin"
  },
  {
    "type": "post",
    "url": "/user-login",
    "title": "Create a new user-login",
    "group": "User_login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>user's Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>user's Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "PhoneID",
            "description": "<p>user's PhoneID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "PhoneName",
            "description": "<p>user's PhoneName</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User_login",
    "name": "PostUserLogin"
  },
  {
    "type": "put",
    "url": "/user-login",
    "title": "Update an user-login",
    "group": "User_login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "ID",
            "description": "<p>user-login id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User_login",
    "name": "PutUserLogin"
  },
  {
    "type": "get",
    "url": "/user/:Email",
    "title": "Get an user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>user's email</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "GetUserEmail"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get an user list",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "GetUsers"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a new user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>user's first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>user's last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>user's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostUser"
  },
  {
    "type": "put",
    "url": "/user",
    "title": "Update an user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>user's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>user's first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LasttName",
            "description": "<p>user's last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>user's password</p>"
          },
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": false,
            "field": "Admin",
            "description": "<p>user's admin status</p>"
          },
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": false,
            "field": "Decimal",
            "description": "<p>point user's decimal point</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Delimiter",
            "description": "<p>user's delimiter</p>"
          },
          {
            "group": "Parameter",
            "type": "Bool",
            "optional": false,
            "field": "Scatter",
            "description": "<p>user's scatter</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PutUser"
  },
  {
    "type": "delete",
    "url": "/device/:deviceID",
    "title": "Delete an device by ID",
    "group": "device",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "DeleteDeviceDeviceid"
  },
  {
    "type": "delete",
    "url": "/devicetypes/:devicetypeID",
    "title": "Delete an devicetypes by ID",
    "group": "device",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "DeleteDevicetypesDevicetypeid"
  },
  {
    "type": "get",
    "url": "/device",
    "title": "Get an device list",
    "group": "device",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "GetDevice"
  },
  {
    "type": "get",
    "url": "/device/deviceID",
    "title": "by ID",
    "group": "device",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "GetDeviceDeviceid"
  },
  {
    "type": "get",
    "url": "/devicetypes",
    "title": "Get  devicetype list",
    "group": "device",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "GetDevicetypes"
  },
  {
    "type": "get",
    "url": "/devicetypes/:devicetypeID",
    "title": "by ID",
    "group": "device",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "GetDevicetypesDevicetypeid"
  },
  {
    "type": "post",
    "url": "/device",
    "title": "Create a new device",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "DeviceTypeID",
            "description": "<p>device's TypeId</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "DeviceSampleTime",
            "description": "<p>device's Sample time</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "PostDevice"
  },
  {
    "type": "post",
    "url": "/devicetypes",
    "title": "Create a new sifdevicetype",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>devicetype's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>devicetype's Description</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "PostDevicetypes"
  },
  {
    "type": "put",
    "url": "/device/:devicetypeID",
    "title": "Update  device",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DeviceTypeID",
            "description": "<p>device's TypeId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DeviceSampleTime",
            "description": "<p>device's Sample Time</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "PutDeviceDevicetypeid"
  },
  {
    "type": "put",
    "url": "/devicetypes/:devicetypeID",
    "title": "Update an devicetype",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>devicetype's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>devicetypes's Description</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device",
    "name": "PutDevicetypesDevicetypeid"
  },
  {
    "type": "get",
    "url": "/device/sensor",
    "title": "Get an device list",
    "group": "device_sensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device_sensor",
    "name": "GetDeviceSensor"
  },
  {
    "type": "get",
    "url": "/device/sensor/deviceID",
    "title": "by ID Get all device",
    "group": "device_sensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device_sensor",
    "name": "GetDeviceSensorDeviceid"
  },
  {
    "type": "post",
    "url": "/device/sensor",
    "title": "Create a new device-sensor",
    "group": "device_sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "DeviceID",
            "description": "<p>device's ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "SensorID",
            "description": "<p>sensor's ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device_sensor",
    "name": "PostDeviceSensor"
  },
  {
    "type": "put",
    "url": "/devicesensor/:deviceSensorID",
    "title": "Update an device sensor",
    "group": "device_sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DeviceID",
            "description": "<p>device's ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "SensorID",
            "description": "<p>sensor's ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "device_sensor",
    "name": "PutDevicesensorDevicesensorid"
  },
  {
    "type": "delete",
    "url": "/replicationsensor/:ID",
    "title": "Delete an replicationsensor by ID",
    "group": "replicationsensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "replicationsensor",
    "name": "DeleteReplicationsensorId"
  },
  {
    "type": "get",
    "url": "/replicationsensor",
    "title": "Get an replicationsensor list",
    "group": "replicationsensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "replicationsensor",
    "name": "GetReplicationsensor"
  },
  {
    "type": "get",
    "url": "/replicationsensor/:ID",
    "title": "by ID",
    "group": "replicationsensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "replicationsensor",
    "name": "GetReplicationsensorId"
  },
  {
    "type": "post",
    "url": "/replicationsensor",
    "title": "Create a new replicationsensor",
    "group": "replicationsensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "ExperimentID",
            "description": "<p>replicationsensor's ExperimentID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DeviceID",
            "description": "<p>replicationsensor's DeviceID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "SensorID",
            "description": "<p>replicationsensor's SensorID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ReplicationID",
            "description": "<p>replicationsensor's ReplicationID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "SampleTime",
            "description": "<p>replicationsensor's SampleTime</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "MetaData",
            "description": "<p>replicationsensor's MetaData</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "replicationsensor",
    "name": "PostReplicationsensor"
  },
  {
    "type": "delete",
    "url": "/sensor/:sensorID",
    "title": "Delete an sensor by sensorID",
    "group": "sensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensor",
    "name": "DeleteSensorSensorid"
  },
  {
    "type": "get",
    "url": "/sensor",
    "title": "Get an sensor list",
    "group": "sensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensor",
    "name": "GetSensor"
  },
  {
    "type": "get",
    "url": "/sensor/sensorID",
    "title": "by ID",
    "group": "sensor",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensor",
    "name": "GetSensorSensorid"
  },
  {
    "type": "post",
    "url": "/device",
    "title": "Create a new sensor",
    "group": "sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "SensorTypeId",
            "description": "<p>sensor's SensorTypeId</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Range",
            "description": "<p>sensor's Range</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensor",
    "name": "PostDevice"
  },
  {
    "type": "put",
    "url": "/sensor/:sensorID",
    "title": "Update an device",
    "group": "sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Range",
            "description": "<p>sensor's Range</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensor",
    "name": "PutSensorSensorid"
  },
  {
    "type": "delete",
    "url": "/sensordata/:ReplicationSensorID",
    "title": "Delete an sensordata by ReplicationSensorID",
    "group": "sensordata",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensordata",
    "name": "DeleteSensordataReplicationsensorid"
  },
  {
    "type": "get",
    "url": "/sensordata",
    "title": "Get an sensordata list",
    "group": "sensordata",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensordata",
    "name": "GetSensordata"
  },
  {
    "type": "get",
    "url": "/sensordata/:ReplicationSensorID",
    "title": "by ReplicationSensorID Get all sensordata",
    "group": "sensordata",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensordata",
    "name": "GetSensordataReplicationsensorid"
  },
  {
    "type": "post",
    "url": "/sensordata",
    "title": "Create a new sensordata",
    "group": "sensordata",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "ReplicationSensorID",
            "description": "<p>sensordata's ReplicationSensorID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TimeStamp",
            "description": "<p>sensordata's TimeStamp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DOF1",
            "description": "<p>sensordata's DOF1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DOF2",
            "description": "<p>sensordata's DOF2</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DOF3",
            "description": "<p>sensordata's DOF3</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensordata",
    "name": "PostSensordata"
  },
  {
    "type": "delete",
    "url": "/sensortypes/:sensortypeID",
    "title": "Delete an sensortypes by ID",
    "group": "sensortypes",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensortypes",
    "name": "DeleteSensortypesSensortypeid"
  },
  {
    "type": "get",
    "url": "/sensortypes",
    "title": "Get an sensortypes list",
    "group": "sensortypes",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensortypes",
    "name": "GetSensortypes"
  },
  {
    "type": "get",
    "url": "/sensortypes",
    "title": "by ID Get all sensortypes",
    "group": "sensortypes",
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensortypes",
    "name": "GetSensortypes"
  },
  {
    "type": "post",
    "url": "/sensortypes",
    "title": "Create a new sifSensorType",
    "group": "sensortypes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>sensortype's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>sensortype's Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DOF",
            "description": "<p>sensortype's DOF</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Number",
            "description": "<p>sensortype's Number</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensortypes",
    "name": "PostSensortypes"
  },
  {
    "type": "put",
    "url": "/sensortypes/:sensortypeID",
    "title": "Update an sensortype",
    "group": "sensortypes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>sensortype's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>sensortype's Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "DOF",
            "description": "<p>sensortype's DOF</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Number",
            "description": "<p>sensortype's Number</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "sensortypes",
    "name": "PutSensortypesSensortypeid"
  }
] });

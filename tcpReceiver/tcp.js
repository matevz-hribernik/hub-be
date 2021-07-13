var net = require('net');
var sockets = [];
var port = 8889;
var sql = require("../modelDB/mysqlModel.js");
var JsonSocket = require('json-socket');
var replication = require("../modelDB/replication");
var replicationSensor = require("../modelDB/replicationSensor");
var settings = require("../settings")

//var guestId = 0;

function storeSensorData(reqObj) {
	return new Promise((resolve, reject) => {
		console.log("Getting data,", reqObj)
		var MeasurementID = reqObj.measurement;
	    var Frequency = reqObj.Frequency;
	    var DOF1 = reqObj.x;
	    var DOF2 = reqObj.y;
	    var DOF3 = reqObj.z;
	    var SensorID = reqObj.SensorID;
	    var ExperimentID = reqObj.ExperimentID;
	    var timestamp = reqObj.timestamp * 1;
	    if (typeof DOF1 != "number", typeof DOF2 != "number", typeof DOF3 !== "number") {
	        reject({status:"NOK", error:"sensor data must be a number."})
	    }else{
	        var query = "INSERT INTO " + settings.tableNames.sensorData + " (MeasurementID, `Frequency`, DOF1, DOF2, DOF3, ExperimentID, SensorID, timestamp) VALUES (?,?,?,?,?,?,?,?);";
	        var data = [MeasurementID, Frequency, DOF1, DOF2, DOF3, ExperimentID, SensorID, timestamp];
	        sql.exacuteQueryWithArgs(query, data, function(err, res){
	            if(err){
	                reject({status:"NOK", error:err});
	            }else{
	                resolve(res);
	            }
	        })
	    }
	});
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const storeAllSensors = async (sensors) => {
		var storedSensors = [];
		var stored;
		await asyncForEach(sensors, async (sensor) => {
		    stored = await storeSensorData(sensor);
		    storedSensors.push(stored)
		});
		return storedSensors;
}

var server = net.createServer(function(connection) {
    console.log('TCP client connected');
    connection.on('end', function() {
        console.log('client disconnected');
    });
	//var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket

	connection.on("error", function(err){
		console.error("Caught flash policy server socket error: ")
		console.error(err.stack)
	});

	connection.on("data", async function(message){
		var messageList = message.toString('utf8');
		var validJson;	
		try{
			validJson = JSON.parse(messageList);
			var savedData = await storeAllSensors(validJson)
		}catch(error){
			console.error(error)
		}
		
	})
	connection.pipe(connection);
});


server.listen(port, function() {

    console.log("Server listening at http://localhost:" + port);

});
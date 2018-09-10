var net = require('net');
var sockets = [];
var port = 8888;
var sql = require("../modelDB/mysqlModel.js");
var JsonSocket = require('json-socket');
var replication = require("../modelDB/replication");
var replicationSensor = require("../modelDB/replicationSensor");
var settings = require("../settings")

//var guestId = 0;

function storeSensorData(reqObj) {
	return new Promise((resolve, reject) => {
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

function parseSensorsData(data){
	var dataArray = data.split(";");
	// console.log('++', dataArray)
	/*if(dataArray.length > 5){
		//Device motion data
		if(dataArray[2] != ""){
			try{
			
			sql.storeDataOfSensorFromUdp(
			{"x":parseFloat(dataArray[2]),
			"y":parseFloat(dataArray[3]),
			"z":parseFloat(dataArray[4]),
			"time": dataArray[0],
			"measureid": dataArray[1],
			"sensor": 0 });
			}catch(e){
				console.log(e)
			}	
		}
		
		if(dataArray[5]!=""){
			try{
				sql.storeDataOfSensorFromUdp(
				{"x":parseFloat(dataArray[5]),
				"y":parseFloat(dataArray[6]),
				"z":parseFloat(dataArray[7]),
				"time": dataArray[0],
				"measureid": dataArray[1],
				"sensor": 1 })
			}catch(e){
				console.log(e)
			}
		}
		if(dataArray[8]!= ""){
			try{
				sql.storeDataOfSensorFromUdp(
				{"x":parseFloat(dataArray[8]),
			"y":parseFloat(dataArray[9]),
			"z":parseFloat(dataArray[10]),
			"time": dataArray[0],
			"measureid": dataArray[1],
			"sensor": 2 });
			}catch(e){
				console.log(e)
			}
		}
		
		if(dataArray[11] != ""){
			try{
			sql.storeDataOfSensorFromUdp(	
			{"x":parseFloat(dataArray[11]),
			"y":parseFloat(dataArray[12]),
			"z":parseFloat(dataArray[13]),
			"time": dataArray[0],
			"measureid": dataArray[1],
			"sensor":3 }
			)
			
			}catch(e){
			console.log(e)
			}
		}
		
		
		
	}else if(dataArray.length == 5){
		//raw acc data
		//console.log(dataArray[2], parseFloat(dataArray[2]));
		console.log({"x":dataArray[2],
			"y": dataArray[3],
			"z":dataArray[4],
			"time": dataArray[0],
			"measureid": dataArray[1],
			"sensor": 4 })
		try{
			sql.storeDataOfSensorFromUdp(
			{"x":parseFloat(dataArray[2]),
			"y": parseFloat(dataArray[3]),
			"z":parseFloat(dataArray[4]),
			"time": dataArray[0],
			"measureid": dataArray[1],
			"sensor": 4 });
		}catch(e){
			console.log(e)
		}
		

	}*/
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
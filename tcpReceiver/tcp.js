var net = require('net');
var sockets = [];
var port = 8888;
var sql = require("../modelDB/sqlDo.js");
var JsonSocket = require('json-socket');
var replication = require("../modelDB/replication");
var replicationSensor = require("../modelDB/replicationSensor");
var async = require("async")

//var guestId = 0;

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
		 console.log("Caught flash policy server socket error: ")
		console.log(err.stack)
		}
		);

	function getReplications(MeasurementID, callback) {
		replication.getAllReplications({
			MeasurementID:MeasurementID,
			Active: true
		}, function(err, res) {
			if (err || !res || !res.data || !res.data[0] || !res.data[0].Active) {
				callback(err || "No active replication.");
			} else {
				callback(null, res.data[0]);
			}
		})
	}

	function fetchReplicationSensor(replication, callback) {
		replication.getReplicationSensorByReplication(replication.ID, function(err, res) {
			if (!err) {
				callback(err)
			} else {
				console.log(res)
				// callback(null, replication)
			}
		})
	}


	function postReplicationSensor(item, callback) {
		replicationSensor.postReplicationSensor({
			ExperimentID: item.ExperimentID,
			DeviceID: item.DeviceID,
			SensorID: item.SensorID,
			ReplicationID: item.ReplicationID,
			SampleTime: 1
		}, function(err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res.data);
			}
		})
	}
		
		
	connection.on("data", function(message){
		var messageList = message.toString('utf8');
		var validJson;	
		try{
			validJson = JSON.parse(messageList);
			
			console.log(typeof validJson, validJson)
		}catch(error){
			console.log(error)
			}
		
	})
	connection.pipe(connection);
});


server.listen(port, function() {

    console.log("Server listening at http://localhost:" + port);

});
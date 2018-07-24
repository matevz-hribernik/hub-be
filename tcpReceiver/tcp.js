var net = require('net');
var sockets = [];
var port = 8888;
var sql = require("../modelDB/sqlDo.js");
var    JsonSocket = require('json-socket');

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
    console.log('client connected');
    connection.on('end', function() {
        console.log('client disconnected');
    });
	//var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket

	connection.on("error", function(err){
		 console.log("Caught flash policy server socket error: ")
		console.log(err.stack)
		}
		);
		
		
	connection.on("data", function(message){
		// console.log("TCP data", message)
		 var messageList = message.toString('utf8').split("\n");
		for(indx in messageList){
			try{	
			parseSensorsData(messageList[indx]);
			}catch(error){
				console.log(error)
			}
		}
	})
	connection.pipe(connection);
});


server.listen(port, function() {

    console.log("Server listening at http://localhost:" + port);

});
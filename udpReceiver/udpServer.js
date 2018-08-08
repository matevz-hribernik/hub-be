/**
 * Created by EkaterinaAcc on 22-Nov-15.
 */
var dgram = require('dgram');
var serverUdp = dgram.createSocket('udp4');
var settings = require("../settings.js");
var sql = require("../modelDB/sqlDo.js");

serverUdp.on('listening', function () {
    var address = serverUdp.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

serverUdp.on('message', function (message, remote) {
   //console.log(remote.address + ':' + remote.port +' - ' + message);
    var jsonMesage = JSON.parse( message.toString('utf8').trim());
    console.log("UDP msg", jsonMesage);
    // sql.storeDataOfSensorFromUdp(jsonMesage);
    //sql.storeSensorsDataFromUdp(jsonMesage);
});

serverUdp.bind(settings.port);
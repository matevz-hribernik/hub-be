/**
 * Created by EkaterinaAcc on 06-Oct-15.
 */
var http = require('http').Server(app);
var udp = require("./udpReceiver/udpServer.js");
var tcp = require("./tcpReceiver/tcp.js")
var bodyParser = require('body-parser')
var express  = require('express');
var connect = require('connect');
var app      = express();
var settings = require("./settings.js");
var port     = process.env.PORT || settings.port;

// Configuration
app.use(express.static(__dirname + '/frontend'));
//app.use(connect.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//app.use(connect.urlencoded());

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

require('./routes/routes.js')(app);

app.listen(port);

console.log('The App runs on port ' + port);

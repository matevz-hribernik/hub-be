
call apidoc -i C:\SensorServer2017\SensorDataServer\routes -o C:\xampp2\htdocs\apidocs
call forever stop index.js
ECHO 'stoped'
call forever start index.js
ECHO 'started'

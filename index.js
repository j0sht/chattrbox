var http = require('http');
var fileIO = require('./fileIO');
fileIO.baseFolder = 'app';
var server = http.createServer(fileIO.respondToRequest);
server.listen(3000);

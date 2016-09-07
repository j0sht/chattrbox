var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
var PSWD = 'Swordfish';
console.log('websockets server started');

ws.on('connection', function(socket) {
    console.log('client connection established.');
    socket.authenticated = false;
        
    socket.on('message', function(data) {
	console.log('message received: ' + data);
	if (data === PSWD) {
	    socket.authenticated = true;
	    messages.forEach(function(msg) {
		socket.send(msg);
	    });
	}
	if (socket.authenticated) {
	    messages.push(data);
	    ws.clients.forEach(function(clientSocket) {
		if (clientSocket.authenticated)
		    clientSocket.send(data);
	    });
	}
    });
});

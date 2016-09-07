var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
var repeatCount = 2;
console.log('websockets server started');

ws.on('connection', function(socket) {
    console.log('client connection established.');
    
    messages.forEach(function(msg) {
	socket.send(msg);
    });
    
    socket.on('message', function(data) {
	console.log('message received: ' + data);
	messages.push(data);
	// ws object keeps track of all connections
	// via the clients array
	ws.clients.forEach(function(clientSocket) {
	    for (var i = 0; i < repeatCount; i++) 
		clientSocket.send(data);
	});
	repeatCount++;
    });
});

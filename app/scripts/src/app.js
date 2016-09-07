/* 
  The app module (controller)
    Defines the structure of messages and passes messages between
    ws-client and dom
*/

import socket from './ws-client';

class ChatApp {
    constructor() { // run any time a new instance of class is created
	socket.init('ws://localhost:3001');
	socket.registerOpenHandler(() => {
	    let message = new ChatMessage({ message: 'pow!' });
	    socket.sendMessage(message.serialize());
	});
	socket.registerMessageHandler((data) => {
	    console.log(data);
	});
	socket.registerCloseHandler(() => {
	    console.log("connection closed");
	});
    }
}

class ChatMessage {
    constructor({
	message: m,
	user: u='batman',
	timestamp: t=(new Date()).getTime()
    }) {
	this.message = m;
	this.user = u;
	this.timestamp = t;
    }

    serialize() {
	return {
	    user: this.user,
	    message: this.message,
	    timestamp: this.timestamp
	};
    }
}

export default ChatApp;

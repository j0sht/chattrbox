/* 
  The app module (controller)
    Defines the structure of messages and passes messages between
    ws-client and dom
*/

import socket from './ws-client';
import {ChatForm, ChatList} from './dom'; // named import

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class ChatApp {
    constructor() { // run any time a new instance of class is created
	this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
	this.chatList = new ChatList(LIST_SELECTOR, 'wonderwoman');
	socket.init('ws://localhost:3001');
	socket.registerOpenHandler(() => {
	    this.chatForm.init((data) => { 
		let message = new ChatMessage({message: data});
		socket.sendMessage(message.serialize());
	    });
	});
	socket.registerMessageHandler((data) => {
	    console.log(data);
	    let message = new ChatMessage(data);
	    this.chatList.drawMessage(message.serialize());
	});
    }
}

class ChatMessage {
    constructor({
	message: m,
	user: u='wonderwoman',
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

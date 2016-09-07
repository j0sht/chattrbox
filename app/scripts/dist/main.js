(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* 
                                                                                                                                                            The app module (controller)
                                                                                                                                                              Defines the structure of messages and passes messages between
                                                                                                                                                              ws-client and dom
                                                                                                                                                          */

var ChatApp = function ChatApp() {
			_classCallCheck(this, ChatApp);

			// run any time a new instance of class is created
			_wsClient2.default.init('ws://localhost:3001');
			_wsClient2.default.registerOpenHandler(function () {
						var message = new ChatMessage({ message: 'pow!' });
						_wsClient2.default.sendMessage(message.serialize());
			});
			_wsClient2.default.registerMessageHandler(function (data) {
						console.log(data);
			});
			_wsClient2.default.registerCloseHandler(function () {
						console.log("connection closed");
			});
};

var ChatMessage = function () {
			function ChatMessage(_ref) {
						var m = _ref.message;
						var _ref$user = _ref.user;
						var u = _ref$user === undefined ? 'batman' : _ref$user;
						var _ref$timestamp = _ref.timestamp;
						var t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

						_classCallCheck(this, ChatMessage);

						this.message = m;
						this.user = u;
						this.timestamp = t;
			}

			_createClass(ChatMessage, [{
						key: 'serialize',
						value: function serialize() {
									return {
												user: this.user,
												message: this.message,
												timestamp: this.timestamp
									};
						}
			}]);

			return ChatMessage;
}();

exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default(); /*
                       main module
                         initializes application
                     */

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
  ws-client (model)
    manages WebSockets communication
*/
var socket = void 0;

function init(url) {
    socket = new WebSocket(url);
    console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
    socket.onopen = function () {
        console.log('open');
        handlerFunction();
    };
}

function registerMessageHandler(handlerFunction) {
    socket.onmessage = function (e) {
        console.log('message', e.data);
        var data = JSON.parse(e.data);
        handlerFunction(data);
    };
}

function registerCloseHandler(handlerFunction) {
    socket.onclose = function () {
        handlerFunction();
    };
}

function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}

exports.default = {
    init: init, // same as init: init
    registerOpenHandler: registerOpenHandler,
    registerMessageHandler: registerMessageHandler,
    registerCloseHandler: registerCloseHandler,
    sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNNQTs7Ozs7OzBKQU5BOzs7Ozs7SUFRTSxPLEdBQ0YsbUJBQWM7QUFBQTs7QUFBRTtBQUNuQixzQkFBTyxJQUFQLENBQVkscUJBQVo7QUFDQSxzQkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQzdCLFVBQUksVUFBVSxJQUFJLFdBQUosQ0FBZ0IsRUFBRSxTQUFTLE1BQVgsRUFBaEIsQ0FBZDtBQUNBLHlCQUFPLFdBQVAsQ0FBbUIsUUFBUSxTQUFSLEVBQW5CO0FBQ0gsSUFIRDtBQUlBLHNCQUFPLHNCQUFQLENBQThCLFVBQUMsSUFBRCxFQUFVO0FBQ3BDLGNBQVEsR0FBUixDQUFZLElBQVo7QUFDSCxJQUZEO0FBR0Esc0JBQU8sb0JBQVAsQ0FBNEIsWUFBTTtBQUM5QixjQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNILElBRkQ7QUFHSSxDOztJQUdDLFc7QUFDRiw4QkFJRztBQUFBLFVBSEcsQ0FHSCxRQUhOLE9BR007QUFBQSwyQkFGTixJQUVNO0FBQUEsVUFGQSxDQUVBLDZCQUZFLFFBRUY7QUFBQSxnQ0FETixTQUNNO0FBQUEsVUFESyxDQUNMLGtDQURRLElBQUksSUFBSixFQUFELENBQWEsT0FBYixFQUNQOztBQUFBOztBQUNOLFdBQUssT0FBTCxHQUFlLENBQWY7QUFDQSxXQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0k7Ozs7a0NBRVc7QUFDZixnQkFBTztBQUNILGtCQUFNLEtBQUssSUFEUjtBQUVILHFCQUFTLEtBQUssT0FGWDtBQUdILHVCQUFXLEtBQUs7QUFIYixVQUFQO0FBS0k7Ozs7OztrQkFHVSxPOzs7OztBQ3hDZjs7Ozs7O0FBQ0Esb0IsQ0FMQTs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUlBLElBQUksZUFBSjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2YsYUFBUyxJQUFJLFNBQUosQ0FBYyxHQUFkLENBQVQ7QUFDQSxZQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0g7O0FBRUQsU0FBUyxtQkFBVCxDQUE2QixlQUE3QixFQUE4QztBQUMxQyxXQUFPLE1BQVAsR0FBZ0IsWUFBTTtBQUN6QixnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBO0FBQ0ksS0FIRDtBQUlIOztBQUVELFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsRUFBaUQ7QUFDN0MsV0FBTyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQzdCLGdCQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEVBQUUsSUFBekI7QUFDQSxZQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSx3QkFBZ0IsSUFBaEI7QUFDSSxLQUpEO0FBS0g7O0FBRUQsU0FBUyxvQkFBVCxDQUE4QixlQUE5QixFQUErQztBQUMzQyxXQUFPLE9BQVAsR0FBaUIsWUFBTTtBQUMxQjtBQUNJLEtBRkQ7QUFHSDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDMUIsV0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0g7O2tCQUVjO0FBQ1gsY0FEVyxFQUNMO0FBQ04sNENBRlc7QUFHWCxrREFIVztBQUlYLDhDQUpXO0FBS1g7QUFMVyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIFxuICBUaGUgYXBwIG1vZHVsZSAoY29udHJvbGxlcilcbiAgICBEZWZpbmVzIHRoZSBzdHJ1Y3R1cmUgb2YgbWVzc2FnZXMgYW5kIHBhc3NlcyBtZXNzYWdlcyBiZXR3ZWVuXG4gICAgd3MtY2xpZW50IGFuZCBkb21cbiovXG5cbmltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xuXG5jbGFzcyBDaGF0QXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgLy8gcnVuIGFueSB0aW1lIGEgbmV3IGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcblx0c29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcblx0c29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xuXHQgICAgbGV0IG1lc3NhZ2UgPSBuZXcgQ2hhdE1lc3NhZ2UoeyBtZXNzYWdlOiAncG93IScgfSk7XG5cdCAgICBzb2NrZXQuc2VuZE1lc3NhZ2UobWVzc2FnZS5zZXJpYWxpemUoKSk7XG5cdH0pO1xuXHRzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xuXHQgICAgY29uc29sZS5sb2coZGF0YSk7XG5cdH0pO1xuXHRzb2NrZXQucmVnaXN0ZXJDbG9zZUhhbmRsZXIoKCkgPT4ge1xuXHQgICAgY29uc29sZS5sb2coXCJjb25uZWN0aW9uIGNsb3NlZFwiKTtcblx0fSk7XG4gICAgfVxufVxuXG5jbGFzcyBDaGF0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuXHRtZXNzYWdlOiBtLFxuXHR1c2VyOiB1PSdiYXRtYW4nLFxuXHR0aW1lc3RhbXA6IHQ9KG5ldyBEYXRlKCkpLmdldFRpbWUoKVxuICAgIH0pIHtcblx0dGhpcy5tZXNzYWdlID0gbTtcblx0dGhpcy51c2VyID0gdTtcblx0dGhpcy50aW1lc3RhbXAgPSB0O1xuICAgIH1cblxuICAgIHNlcmlhbGl6ZSgpIHtcblx0cmV0dXJuIHtcblx0ICAgIHVzZXI6IHRoaXMudXNlcixcblx0ICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcblx0ICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXBcblx0fTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XG4iLCIvKlxuICBtYWluIG1vZHVsZVxuICAgIGluaXRpYWxpemVzIGFwcGxpY2F0aW9uXG4qL1xuaW1wb3J0IENoYXRBcHAgZnJvbSAnLi9hcHAnO1xubmV3IENoYXRBcHAoKTtcbiIsIi8qXG4gIHdzLWNsaWVudCAobW9kZWwpXG4gICAgbWFuYWdlcyBXZWJTb2NrZXRzIGNvbW11bmljYXRpb25cbiovXG5sZXQgc29ja2V0O1xuXG5mdW5jdGlvbiBpbml0KHVybCkge1xuICAgIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uLicpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xuICAgIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG5cdGNvbnNvbGUubG9nKCdvcGVuJyk7XG5cdGhhbmRsZXJGdW5jdGlvbigpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XG5cdGNvbnNvbGUubG9nKCdtZXNzYWdlJywgZS5kYXRhKTtcblx0bGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG5cdGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckNsb3NlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcbiAgICBzb2NrZXQub25jbG9zZSA9ICgpID0+IHtcblx0aGFuZGxlckZ1bmN0aW9uKCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQsIC8vIHNhbWUgYXMgaW5pdDogaW5pdFxuICAgIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcbiAgICByZWdpc3RlckNsb3NlSGFuZGxlcixcbiAgICBzZW5kTWVzc2FnZVxufVxuIl19

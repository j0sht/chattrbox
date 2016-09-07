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

function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}

exports.default = {
    init: init, // same as init: init
    registerOpenHandler: registerOpenHandler,
    registerMessageHandler: registerMessageHandler,
    sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNNQTs7Ozs7OzBKQU5BOzs7Ozs7SUFRTSxPLEdBQ0YsbUJBQWM7QUFBQTs7QUFBRTtBQUNuQixzQkFBTyxJQUFQLENBQVkscUJBQVo7QUFDQSxzQkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQzdCLFVBQUksVUFBVSxJQUFJLFdBQUosQ0FBZ0IsRUFBRSxTQUFTLE1BQVgsRUFBaEIsQ0FBZDtBQUNBLHlCQUFPLFdBQVAsQ0FBbUIsUUFBUSxTQUFSLEVBQW5CO0FBQ0gsSUFIRDtBQUlBLHNCQUFPLHNCQUFQLENBQThCLFVBQUMsSUFBRCxFQUFVO0FBQ3BDLGNBQVEsR0FBUixDQUFZLElBQVo7QUFDSCxJQUZEO0FBR0ksQzs7SUFHQyxXO0FBQ0YsOEJBSUc7QUFBQSxVQUhHLENBR0gsUUFITixPQUdNO0FBQUEsMkJBRk4sSUFFTTtBQUFBLFVBRkEsQ0FFQSw2QkFGRSxRQUVGO0FBQUEsZ0NBRE4sU0FDTTtBQUFBLFVBREssQ0FDTCxrQ0FEUSxJQUFJLElBQUosRUFBRCxDQUFhLE9BQWIsRUFDUDs7QUFBQTs7QUFDTixXQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNJOzs7O2tDQUVXO0FBQ2YsZ0JBQU87QUFDSCxrQkFBTSxLQUFLLElBRFI7QUFFSCxxQkFBUyxLQUFLLE9BRlg7QUFHSCx1QkFBVyxLQUFLO0FBSGIsVUFBUDtBQUtJOzs7Ozs7a0JBR1UsTzs7Ozs7QUNyQ2Y7Ozs7OztBQUNBLG9CLENBTEE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxJQUFJLGVBQUo7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNmLGFBQVMsSUFBSSxTQUFKLENBQWMsR0FBZCxDQUFUO0FBQ0EsWUFBUSxHQUFSLENBQVksZUFBWjtBQUNIOztBQUVELFNBQVMsbUJBQVQsQ0FBNkIsZUFBN0IsRUFBOEM7QUFDMUMsV0FBTyxNQUFQLEdBQWdCLFlBQU07QUFDekIsZ0JBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQUNJLEtBSEQ7QUFJSDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWlEO0FBQzdDLFdBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUM3QixnQkFBUSxHQUFSLENBQVksU0FBWixFQUF1QixFQUFFLElBQXpCO0FBQ0EsWUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsSUFBYixDQUFYO0FBQ0Esd0JBQWdCLElBQWhCO0FBQ0ksS0FKRDtBQUtIOztBQUVELFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QjtBQUMxQixXQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDSDs7a0JBRWM7QUFDWCxjQURXLEVBQ0w7QUFDTiw0Q0FGVztBQUdYLGtEQUhXO0FBSVg7QUFKVyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIFxuICBUaGUgYXBwIG1vZHVsZSAoY29udHJvbGxlcilcbiAgICBEZWZpbmVzIHRoZSBzdHJ1Y3R1cmUgb2YgbWVzc2FnZXMgYW5kIHBhc3NlcyBtZXNzYWdlcyBiZXR3ZWVuXG4gICAgd3MtY2xpZW50IGFuZCBkb21cbiovXG5cbmltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xuXG5jbGFzcyBDaGF0QXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgLy8gcnVuIGFueSB0aW1lIGEgbmV3IGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcblx0c29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcblx0c29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xuXHQgICAgbGV0IG1lc3NhZ2UgPSBuZXcgQ2hhdE1lc3NhZ2UoeyBtZXNzYWdlOiAncG93IScgfSk7XG5cdCAgICBzb2NrZXQuc2VuZE1lc3NhZ2UobWVzc2FnZS5zZXJpYWxpemUoKSk7XG5cdH0pO1xuXHRzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xuXHQgICAgY29uc29sZS5sb2coZGF0YSk7XG5cdH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQ2hhdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHtcblx0bWVzc2FnZTogbSxcblx0dXNlcjogdT0nYmF0bWFuJyxcblx0dGltZXN0YW1wOiB0PShuZXcgRGF0ZSgpKS5nZXRUaW1lKClcbiAgICB9KSB7XG5cdHRoaXMubWVzc2FnZSA9IG07XG5cdHRoaXMudXNlciA9IHU7XG5cdHRoaXMudGltZXN0YW1wID0gdDtcbiAgICB9XG5cbiAgICBzZXJpYWxpemUoKSB7XG5cdHJldHVybiB7XG5cdCAgICB1c2VyOiB0aGlzLnVzZXIsXG5cdCAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG5cdCAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wXG5cdH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0QXBwO1xuIiwiLypcbiAgbWFpbiBtb2R1bGVcbiAgICBpbml0aWFsaXplcyBhcHBsaWNhdGlvblxuKi9cbmltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJztcbm5ldyBDaGF0QXBwKCk7XG4iLCIvKlxuICB3cy1jbGllbnQgKG1vZGVsKVxuICAgIG1hbmFnZXMgV2ViU29ja2V0cyBjb21tdW5pY2F0aW9uXG4qL1xubGV0IHNvY2tldDtcblxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLi4nKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJPcGVuSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcbiAgICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnb3BlbicpO1xuXHRoYW5kbGVyRnVuY3Rpb24oKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuXHRjb25zb2xlLmxvZygnbWVzc2FnZScsIGUuZGF0YSk7XG5cdGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuXHRoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQsIC8vIHNhbWUgYXMgaW5pdDogaW5pdFxuICAgIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcbiAgICBzZW5kTWVzc2FnZVxufVxuIl19

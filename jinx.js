var WebSocket = require('ws');
var jinx = new WebSocket('http://localhost:3001');

jinx.on('open', function() {
    jinx.send('GREETINGS NEW ONE TYPE "Jinx" TO SUMMON ME.');
});

jinx.on('message', function(data) {
    if (/^Jinx/.test(data)) {
	jinx.send('hello socket');
    }
});

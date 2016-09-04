var path = require('path');
var fs = require('fs');

var handleError = function(err, res) {
    res.writeHead(404);
    res.end();
};

exports.baseFolder;

var extractFilePath = function(url) {
    var filePath;
    var fileName = 'index.html';
    if (url.length > 1) {
	fileName = url.substring(1);
    }
    console.log('The fileName is: ' + fileName);
    filePath = path.resolve(__dirname, exports.baseFolder, fileName);
    return filePath;
};

exports.respondToRequest = function(req, res) {
    var filePath = extractFilePath(req.url);
    fs.readFile(filePath, function(err, data) {
	if (err) {
	    handleError(err, res);
	    return;
	} else {
	    res.end(data);
	}
    });
};

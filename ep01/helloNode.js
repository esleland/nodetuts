var http = require('http');

var numHits = 0


var server = http.createServer(function(request, response) {
  numHits++;
	console.log('New server request');
	response.writeHead(200, {
		'Content-Type': 'text/plain'	
	});
	response.end("Hello I'm doing nodetuts ep01 hits:" + numHits);
}).listen(4000);

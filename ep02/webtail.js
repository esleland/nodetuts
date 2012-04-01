// webtail.js
// nodetuts ep02
// shows how to pipe output of child processes to web app

var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(request, response) {
  
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  
  // child process
  var tail_child = spawn('tail', ['-f', '/var/log/system.log']);
  
  // kill child process when connection is killed
  request.connection.on('end', function() {
     tail_child.kill();
  })
  
  // child process writes system log to stdout, keeps updating in 
  // real-time each time a new log entry is made. don't understand this
  // from his next episode it attaches a listener to the stdout of this
  // process to capture data events
  tail_child.stdout.on('data', function(data) {
    console.log(data.toString());
    response.write(data);
  })
  
}).listen(4000);
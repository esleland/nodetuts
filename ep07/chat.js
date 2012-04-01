var http = require('http');
    util = require('util');
    fs   = require('fs');
    io   = require('socket.io');
    
var server = http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  
  var rs = fs.createReadStream(__dirname + '/template.html');
  util.pump(rs, response);
  
});

var socket = io.listen(server);

socket.on('connection', function(client) {
  
  var username;
  
  client.send('Welcome to this socket.io chat server, asshole.)');
  client.send('Whassyername???');
  
  client.on('message', function(message) {
    if (!username) {
      username = message;
      client.send('Welcome to this stupid chat server, ' + username + '!');
      return;
    }
    socket.broadcast(username + ' sent: ' + message);
  });
});

server.listen(4000);
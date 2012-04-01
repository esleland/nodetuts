// chat.js
// nodetuts episode 5 chat server

var net = require('net');
var carrier = require('carrier');

var connections = [];

net.createServer(function(conn) {
  
  connections.push(conn);
  
  conn.on('close', function() {
    var pos = connections.indexOf(conn);
    if (pos >= 0) {
      connections.splice(pos, 1);
    }
  });
  
  conn.write("Howdy from the chat server robot.\n");
  conn.write("What's your name, pardner?");
  
  var username;
  
  carrier.carry(conn, function(line) {
    
    if (!username) {
      username = line;
      conn.write("Hey there, " + username + ", you lookin' for a date?\n");
      return;
    }
    
    var toChat = username + ": " + line + "\n";

    if (line === 'quit') {
      conn.end();
      return;
    }

    connections.forEach(function(one_connection) {
      one_connection.write(toChat);
    });
    
  });
  
}).listen(4000);
// file.js
// nodetuts ep03

var http = require('http');
var fs = require('fs');
var util = require('util');

var file_path = __dirname + '/kittyfix.jpg';

fs.stat(file_path, function(err, stat) {

  if (err) {
    throw err;
  }

  http.createServer(function(request, response) {

    response.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Length': stat.size
    });

    // creates a read stream to read the file at file_path
    var rs = fs.createReadStream(file_path);
    
    // util.pump (formerly sys.pump) implements the read/write buffer
    // pause/drain stuff that is more clumsily implemented in the code
    // commented out below
    util.pump(rs, response, function(err) {
      if (err) {
        throw err;
      }
    })
    
    /*
    // the flushed stuff makes sure the buffer has been read and pauses the
    // read stream if it has not so node doesn't use up too much memory
    // reading a file quickly then serving it to a slow client
    rs.on('data', function(data) {
      var flushed = response.write(data);
      if (!flushed) {
        rs.pause();
      }
    })
    
    response.on('drain', function() {
      rs.resume();
    });
    
    rs.on('end', function() {
      response.end();
    })
    
    /* // this is the "naive way" to serve this file because a slow client
      // and a fast server can somehow overwhelm node. so instead we're
      // creating a data stream above
    fs.readFile(file_path, function(err, file_content) {
      response.write(file_content);
      response.end();
    })
    */

  }).listen(4000);  
  
})

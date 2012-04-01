var util = require('util');

module.exports = function() {
  
  var counter = 0;
  
  return function(req, res, next) {
    
    var writeHead = res.writeHead;
    
    counter ++;
    
    res.writeHead = function(code, headers) {
      res.writehead = writeHead;
      console.log("Response# " + counter + ": " + code + ' ' + util.inspect(headers));
      res.writeHead(code, headers);
    }
    
    next();
    
  }
};
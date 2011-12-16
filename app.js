
var  express = require('express')
  , index = require('./index')
  , loader = require('express-cfg-utils').Loader;

var mainServer = loader.createServer();

process.on('uncaughtException', function (err) {
  console.log('uncaught exception:--------------------------------------------- ' );
  console.log( err + err.stack);
});

// it won't be executed on test mode, because it is required from a parent module
if (!module.parent) { 

  loader.boot(mainServer, function(  ) {

    var port = process.env.AUTH_ROOM_PORT || 8080; 
    mainServer.listen(port);
    console.log("Express server listening on port %d in %s mode", mainServer.address().port, mainServer.settings.env);


  });

}

var fs = require('fs')
  , index = require('../index')
  , path = require('path');


exports.bootControllers = function(app, next) {


  var controller_path = app.cfg.get('controller_path'); 
/*
  fs.readdirSync(controller_path).forEach(function(file){

      var file_name = file.replace('.js', '');
      // console.log('controller: ' + file_name);
      
      require( path.join( controller_path, file_name ) ).configure(app); ;

  });
*/

  next();


};


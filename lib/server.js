var express = require('express')
  , gleak = require('gleak')
  , loader = require('express-cfg-utils').Loader
  , NotFoundModelError = require('express-cfg-utils').NotFoundModelError
  , ForbiddenError = require('express-cfg-utils').ForbiddenError
  , NotFoundRouteError = require('express-cfg-utils').NotFoundRouteError;


exports.bootConfigureServer = function(app, next) {

    app.configure( app.cfg.env() , function() {

      app.cfg.env( 'test', function() {


      });

      app.cfg.env( 'development', function() {


				app.use(express.logger('":method :url" :status'));
				//app.cfg.set('PLAYLIST_SOCKET_URL', 'http://www.google.com/');
        app.use( gleak.middleware() );

      });

      app.cfg.env( 'production', function() {

        app.cfg.set('SP_PLAYLIST_SERVICE_URL', process.env.SP_PLAYLIST_SERVICE_URL);

      });

      app.use(express.favicon());
      app.use(express.bodyParser());

      next();

    });


};


exports.bootErrorHandler = function(app, next) {

  app.use(function(req, res, next){

    next( new NotFoundRouteError(req.url) );

  });



  app.error(function(err, req, res, next){

    app.cfg.env( 'development', function() {
   // app.cfg.env( 'test', function() {

       console.log(err); 
       console.log(err.stack); 

    });



    if (err instanceof NotFoundModelError){

      res.json('', 404);

    } else if (err instanceof NotFoundRouteError){

      res.json('', 404);
    
    } else if (err instanceof ForbiddenError){

      res.json('', 403);

    } else {

      console.log('ALERT---------------------------'); 
      console.log(err.stack); 
      res.json('', 500);

    }

  });


  next();
};




exports.boot = function(app, next) {

  loader.bootConfigureServer(app, function() {

    loader.bootModels(app.cfg, function (err, item ) {

        if ( err ) {

          throw err;

        } else {
          
          loader.bootControllers(app, function(err) {

              if ( err ) {

                throw err;

              } else {

                loader.bootErrorHandler(app, function() {

                  //console.log('ending boot process......' );
                  next();

                });
              }
          });

        }

    });
  });  

};


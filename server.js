var express = require('express'),
    concertRoutes = require('./routes/concertRoutes'),
    morgan  = require('morgan'),
    path = require('path');

// Create a class that will be our main application
var SimpleStaticServer = function() {

  // set self to the scope of the class
  var self = this;  
  
  /*  ================================================================  */
  /*  App server functions (main app logic here).                       */
  /*  ================================================================  */

  self.app = express();
  //  self.app.use(connect(connect.basicAuth('j', 'jmjm')))
  self.app.use(morgan('tiny')); // Log requests
  self.app.use(express.static(path.join(__dirname, 'public'))); // Process static files

  // Set the views directory
self.app.set('views', __dirname + '/views');

// Define the view (templating) engine
self.app.set('view engine', 'ejs');

// Routes
/*
* The eventType will create a new collection within the ConcertTracker database with that name
* For example, a Festival type will be a collection of different Festival documents
* a CMU type will be a collection of different concerts that occured at CMU
*/

//// create
self.app.put('/concerts/:eventType', concertRoutes.insert);

//// retrieve
self.app.get('/concerts/:eventType', concertRoutes.find);

//// update
self.app.post('/concerts/:eventType/:eventName', concertRoutes.update);

//// delete
self.app.delete('/concerts/:eventType', concertRoutes.delete);

// Catch any routes not already handed with an error message
self.app.use(concertRoutes.errorMessage);



  // Start the server (starts up the sample application).
  self.start = function() {
    /*
     * OpenShift will provide environment variables indicating the IP 
     * address and PORT to use.  If those variables are not available
     * (e.g. when you are testing the application on your laptop) then
     * use default values of localhost (127.0.0.1) and 50000 (arbitrary).
     */
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    self.port      = process.env.OPENSHIFT_NODEJS_PORT || 50000;

    //  Start listening on the specific IP and PORT
    self.app.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
    });
  };
}; 


/**
 *  main():  Main code.
 */
var sss = new SimpleStaticServer();
sss.start();
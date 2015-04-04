//server.js
/* Sets up server. Meaning, when you first access the page, this page is invoked. It responds with the specific html page to return, and also all the dependencies that the server will need to process the data (ex. data from database and database connection) */

//Instantiate dependencies
var express             = require('express'),                                //create app with express
    app                 = express(),                                         //app is now express method
    morgan              = require('morgan'),                                 //log requests to console (for express 4)
    mongoose            = require('mongoose'),                               //requires mongoose
    bodyParser          = require('body-parser'),                            //pull data from html POST
    methodOverride      = require('method-override'),                        //simulate DELETE and PUT
    database            = require('./configs/database.js');                     //db url connection


//============ Server configuration ============//


mongoose.connect(database.url); //connect to database

app.use(express.static(__dirname + '/public'));                              //set the static files location /public/

app.use(morgan('dev'));                                                      //log every request to console

app.use(bodyParser.urlencoded({'extended': 'true'}));                        //parse application/x-www-form-urlencoded

app.use(bodyParser.json());                                                  //parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));              //parse application/vnd.api+json as json

app.use(methodOverride());

//============ Routes ============//

require('./apps/routes.js')(app);

//============ Listening for connection ============//


app.listen(8000);
console.log("You are now listening to port: 8000");

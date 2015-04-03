//server.js


//Instantiate dependencies
var express             = require('express'),                                //create app with express
    app                 = express(),                                         //app is now express method
    mongoose            = require('mongoose'),                               //mongoose for mongodb; connection for mongoose
    morgan              = require('morgan'),                                 //log requests to console (for express 4)
    bodyParser          = require('body-parser'),                            //pull data from html POST
    methodOverride      = require('method-override'),                        //simulate DELETE and PUT



                                                                             //db connection
    connection          = 'mongodb://admin:pass@proximus.modulusmongo.net:27017/iq5eBesu';


//============ Server configuration ============//


mongoose.connect('mongodb://admin:pass@proximus.modulusmongo.net:27017/iq5eBesu'); //connect to database

app.use(express.static(__dirname + '/public'));                              //set the static files location /public/

app.use(morgan('dev'));                                                      //log every request to console

app.use(bodyParser.urlencoded({'extended': 'true'}));                        //parse application/x-www-form-urlencoded

app.use(bodyParser.json());                                                  //parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));              //parse application/vnd.api+json as json

app.use(methodOverride());

app.get('', function(req, res){

   res.sendfile('index.html');

});

app.get('/app.js', function(req, res){

    res.sendfile('app.js');

});

//============ Listening for connection ============//


app.listen(8000);
console.log("You are now listening to port: 8000");


//============ Define Model ============//


var Todo = mongoose.model('Todo', {

    text: String

});


//============ Routes ============//


app.get('/api/todos', function(req, res){                             //Retrieving all items from mongo

    Todo.find(function(err, todos){

        if(err){                                                      //If there's an error, respond with error
            res.send(err);
        } else {                                                      //Else, send back json data
            res.json(todos);
        }

    });

});

//Posting data to mongo, then retrieving all

app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

app.delete('api/todo/:todo_id', function(req, res){                 //Delete a record in the todo item

    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todos){

        if(err){
            res.send(err);
        }

        Todo.find(function(err, todos){                             //After deleting, retrieve all todo

            if(err){
                res.send(err);
            } else {
                res.json(todos);
            }

        });

    });

});
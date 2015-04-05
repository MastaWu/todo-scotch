//route.js
/* Determines what happens when certain actions are invoked. When you press a button, your button invokes a function and sends you to a specific page */

var Todo = require('./models/todoModel.js');

module.exports = function(app, passport){


    /*app.get('/api/todos', function(req, res){                             //Retrieving all items from mongo

        Todo.find(function(err, todos){

            if(err){                                                      //If there's an error, respond with error
                res.send(err);
            } else {                                                      //Else, send back json data
                res.json(todos);
            }

        });

    });

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

    app.get('*', function(req, res){

        res.sendfile('./public/index.html');

    });*/

    app.get('/', function(req, res){

        res.render('index.ejs');

    });

    app.get('/login', function(req, res){

        res.render('login.ejs', {message: req.flash('loginMessage')});

    });

    app.get('/signup', function(req, res){

        res.render('signup.ejs', {message: req.flash('signupMessage')});

    });

    app.get('/profile', isLoggedIn, function(req, res){

        res.render('profile.ejs', {

            user: req.user

        });

    });

    app.get('logout', function(req, res){

        req.logout();
        res.redirect('/');

    });

}

function isLoggedIn(req, res, next){

    if(req.isAuthenticated()){

        return next;

    } else{

        res.redirect('/');

    }


}
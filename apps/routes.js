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

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages

    }));

    app.post('/login', passport.authenticate('local-login', {

        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages

    }));

};

function isLoggedIn(req, res, next){

    if(req.isAuthenticated()){

        return next();

    } else{

        res.redirect('/');

    }


}
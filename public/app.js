//app.js
/* Angular module defines functions and attaching functions to scope */

var TodoApp = angular.module('TodoApp', []);

function todoController($scope, $http) {

    $scope.formData = {};

    $http.get('/api/todos')

        .success(function(data){

            $scope.todos = data;
            console.log(data);

        })

        .error(function(data){

            console.log("Error: " + data);

        });

    $scope.createTodo = function(){

        $http.post('/api/todos', $scope.formData)

            .success(function(data){

                $scope.formData = {};
                $scope.todos = data;

                console.log(data);

            })

            .error(function(data){

                console.log("Error: " + data);

            });

    }

    $scope.deleteTodo = function(id){

        $http.delete('/api/todos'/ + id)

            .success(function(data){

                $scope.todos = data;
                console.log(data);

            })

            .error(function(data){

                console.log('Error:' + data);

            });

    };

}
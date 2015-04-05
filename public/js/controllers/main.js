//main.js

/* Defines the controllers and attaches services returned object to scope, also includes specific functions per controller */

angular.module('appController', [])

    .controller('todoController', function($scope, $http, Todos){

        $scope.formData = {};

        //=========== Get ===========//

        Todos.get()

            .success(function(data){

                $scope.todos = data;
                console.log(data);

            })

            .error(function(data){

                console.log("Error: " + data);

            });

        //=========== Create ===========//

        $scope.createTodo = function() {

            //Validate the form, if form is empty, don't do anything, but if form has something, create item

            if (!$.isEmptyObject($scope.formData)) {

                Todos.create($scope.formData)

                    .success(function (data) {

                        $scope.formData = {};
                        $scope.todos = data;

                    })

                    .error(function (data) {

                        console.log("Error: " + data);

                    });

            }

        }

        //=========== Delete ===========//

        $scope.deleteTodo = function(id) {

            Todos.delete(id)

                .success(function (data) {

                    $scope.todos = data;
                    console.log(data);

                })

                .error(function (data) {

                    console.log('Error:' + data);

                });

        }

    });
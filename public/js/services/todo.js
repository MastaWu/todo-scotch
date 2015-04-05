//todo.js

/* When a call is made for these specific actions, this calls the $http and does specified actions. It will return promise objects */

angular.module('todoService', [])

    .factory('Todos', function($http){

        return{

            get: function(){
                return $http.get('api/todos');
            },

            create: function(){
                return $http.post('api/todos', todoData);
            },

            delete: function(){
                return $http.delete('api/todos' + id);
            }

        }

    });
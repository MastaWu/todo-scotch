//todoModel.js
/* Todo model for data */

var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {

    text: String,
    done: Boolean

});
/* This file defines the data model schema for 
mongoDB.
*/

//Import Libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define schema for a todo item
let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

//make the todo model available to project
module.exports = mongoose.model('Todo',Todo);
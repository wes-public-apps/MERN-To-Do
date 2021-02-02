/* This file defines the server for the todos application. */

//Import Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Todo = require('./todo.model');

//Define Constants
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

//Connect application to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todos',{ useNewParser: true})
const dbConnection = mongoose.connection;

dbConnection.once('open',()=>{
    console.log("MongoDB database connection established successfully.");
});

//Start listening on port
app.listen(PORT, () => {
    console.log("Server is running on Port: "+ PORT);
})

//Handle traffic routing
const todoRoutes = express.Router();
app.use('/todos',todoRoutes);

// retrieve all todos
todoRoutes.route('/').get((req,res) => {
    Todo.find(
        (err, todos)=>{
            if(err){
                console.log(err);
            } else {
                res.json(todos);
            }
        }
    );
});

//retrieve a todo item with a specific id
todoRoutes.route('/:id').get((req,res)=>{
    let id = req.params.id;
    Todo.findById(id,(err,todo)=>{
        if(err){
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

//add a todo item
todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

//edit a todo item
todoRoutes.route('/update/:id').post((req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(!todo) res.status(404).send("data is not found");
        else {
            todo.todo_description=req.body.todo_description;
            todo.todo_responsible=req.body.todo_responsible;
            todo.todo_priority=req.body.todo_priority;
            todo.todo_completed=req.body.todo_completed;

            todo.save().then(todo =>{
                res.json("Todo updated!");
            })
            .catch(err =>{
                res.status(400).send("Update failed");
            });
        }
    });
});
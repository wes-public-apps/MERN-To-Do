/* This file defines the server for the todos application. */

//Import Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Define Constants
const PORT = 4000;

app.use(cors());
app.unsubscribe(bodyParser.json());

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
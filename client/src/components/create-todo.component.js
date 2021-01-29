//import libraries
import React, { Component } from 'react';
import axios from 'axios';

//define class to represent the component for creating a new todo item
export default class CreateTodo extends Component {
    constructor(props){
        super(props);

        this.state={
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }

        //bind property setters to properties so that they can get updated upon state change
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //set todo item description
    onChangeTodoDescription(e){
        this.setState({
            todo_description: e.target.value
        });
    }

    //set todo item ownership
    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible: e.target.value
        });
    }

    //set todo item priority
    onChangeTodoPriority(e){
        this.setState({
            todo_priority: e.target.value
        });
    }

    //event handler for when the form for creating a todo item is submitted
    onSubmit(e){
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        
        //create a shell object to hold todo item data. this will be serialized by axios
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        //use axios to complete HTTP post request
        axios.post('http://localhost:4000/todos/add',newTodo).then(res => console.log(res.data));
        
        //reinitialize form to be empty
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        // create a form to collect todo data
        return (
            <div>
                <h3>Create new todo item!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-entry">
                        <label>Owner: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-entry">
                        <div className="form-check form-check-inline">
                            <input className="form-check-inline"
                                type="radio"
                                name="priorityOptions"
                                id="low"
                                value="Low"
                                checked={this.state.todo_priority==='Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-inline"
                                type="radio"
                                name="priorityOptions"
                                id="medium"
                                value="Medium"
                                checked={this.state.todo_priority==='Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-inline"
                                type="radio"
                                name="priorityOptions"
                                id="high"
                                value="High"
                                checked={this.state.todo_priority==='High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-entry">
                        <label>Description: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-entry">
                        <input type="submit" value="Create Todo Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
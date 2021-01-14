import React, {Component} from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import custom react components
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/todo-list.component";

class App extends Component{
  render(){
    return(
      <Router>
          <div className="todo-app-container">
            <nav className="navbar navbar-expand-lg navbar-light bg light">
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
            </nav>
            <h2>
              MERN-Stack Todo App
            </h2>
            <Route path="/" exact component={TodoList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
          </div>
      </Router>
    );
  }
}
export default App;

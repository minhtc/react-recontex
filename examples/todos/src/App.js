import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>react-recontext Todo Example</h1>
        </header>
        <div className="App-intro">
          <TodoList />
          <AddTodo />
        </div>
      </div>
    );
  }
}

export default App;

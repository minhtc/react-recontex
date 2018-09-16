## react-recontext

[![npm version](https://badge.fury.io/js/react-recontext.svg)](https://badge.fury.io/js/react-recontext) [![CircleCI badge](https://circleci.com/gh/react-recontext/react-recontext/tree/master.svg?style=shield)](https://circleci.com/gh/react-recontext/react-recontext/tree/master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/minhtc/react-recontext/graphs/contributors)

A lightweight state management using React Context API, inspired by Redux

Super simple and easy to approach react (react-native) application

Screenshots:
![Logger Example](https://github.com/minhtc/react-recontext/raw/master/screenshots/logger.gif "Logger Example")

## Installation

    npm install --save react-recontext

## Usage

1.  Create store.js

        import createStore from "react-recontext";

        const initialState = {
            todos: [
                {
                    id: 1,
                    content: "Drink water",
                    completed: true
                },
            ]
        };

        const actionsCreators = {
            toggleItem: (state, todoId) => ({
                todos: state.todos.map(
                todo =>
                    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
                )
            })
        };

        export const { Provider, connect, actions } = createStore(
            initialState,
            actionsCreators,
            true //enable debugging
        );

2)  Wrap root component with Provider

    // react:

        import React from "react";
        import ReactDOM from "react-dom";
        import { Provider } from "./store";
        import App from "./App";

        ReactDOM.render(
            <Provider>
                <App />
            </Provider>,
            document.getElementById("root")
        );

    // react-native + react-nativation

        import { createStackNavigator } from "react-navigation";
        import { Provider } from "./store";

        const AppNavigator = createStackNavigator(...)

        const App = () => (
            <Provider>
                <AppNavigator />
            </Provider>
        );

3)  Connect component to get data and call action anywhere you want

        import React from "react";
        import Todo from "./Todo";
        import { connect, actions } from "./store";

        const TodoList = ({ todos }) => (
            <ul>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onClick={() => actions.toggleItem(todo.id)}
                    />
                ))}
            </ul>
        );

        const mapStateToProps = state => ({
            todos: state.todos
        });

        export default connect(mapStateToProps)(TodoList);

More detail in [example](https://github.com/minhtc/react-recontext/tree/master/examples/todos) folder

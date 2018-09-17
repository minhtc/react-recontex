## react-recontext

[![npm version](https://badge.fury.io/js/react-recontext.svg)](https://badge.fury.io/js/react-recontext) [![CircleCI](https://circleci.com/gh/minhtc/react-recontext/tree/master.svg?style=svg)](https://circleci.com/gh/minhtc/react-recontext/tree/master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/minhtc/react-recontext/graphs/contributors)

A lightweight state management inspired by Flux, Redux, based on the latest React Context API.

SUPER simple and easy to build react, react-native application and flux architecture.

Following the Flux Architechture but only one root Store:

<center>

![Flux Simple Diagram](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png "Flux Simple Diagram")

</center>

## Installation

    npm install --save react-recontext

_or_

    yarn add react-recontext

## API

1. **createStore**: of course, to create the Store! 😗
2. **Provider**: wrap the root component
3. **connect**: connect any component (View) to Store.
4. **dispatch**: dispatch an event to update the Store

Note: All action event types are generated automatically. For example, when you create an action:

        const actionsCreators = {
            addTodoItem: (state, { item }) => ({
                list: state.list.push(item)
            })
        };

The action event type was also created, so you only need to change the action name from camel case into screaming snake case like this:

        dispatch("ADD_TODO_ITEM", { item: item })

## Usage

There is a detailted example you can play with: [Todo App Example](https://github.com/minhtc/react-recontext/tree/master/examples/todos)

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
            toggleItem: (state, { todoId }) => ({
                todos: state.todos.map(
                    todo =>
                        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
                    )
            })
        };

        export const { Provider, connect, dispatch } = createStore(
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
        import { connect, dispatch } from "./store";

        const TodoList = ({ todos }) => (
            <ul>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onClick={() => dispatch("TOGGLE_ITEM", ({ todoId: todo.id }))}
                    />
                ))}
            </ul>
        );

        const mapStateToProps = state => ({
            todos: state.todos
        });

        export default connect(mapStateToProps)(TodoList);

React-recontext logger example:

<center>

![Logger Example](https://github.com/minhtc/react-recontext/raw/master/screenshots/logger.gif "Logger Example")

</center>

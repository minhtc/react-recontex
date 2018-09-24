## react-recontext

[![npm version](https://badge.fury.io/js/react-recontext.svg)](https://badge.fury.io/js/react-recontext) [![CircleCI](https://circleci.com/gh/minhtc/react-recontext/tree/master.svg?style=svg)](https://circleci.com/gh/minhtc/react-recontext/tree/master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/minhtc/react-recontext/graphs/contributors)

A lightweight state management inspired by Flux, Redux, based on the latest React Context API.

SUPER simple and easy to build react, react-native application and flux architecture.

Following the Flux Architechture but with only one root Store:

<center>

![Flux Simple Diagram](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png "Flux Simple Diagram")

</center>

## Installation

    npm install --save react-recontext

_or_

    yarn add react-recontext

## API

1. **createStore(initial-state, actions, enable-logger)**: of course, to create the app's root Store! 😗
2. **<Provider/>**: wrap the root component. (normally is <App /> Component)
3. **connect(state-to-props)(component)**: connect React Component to Store, very easy to get value from store in any components
4. **dispatch(action-type, {params})**: dispatch an event to update the Store value, from everywhere.

### Important and funny part:

All action event types are generated automatically, you don't need to create action Types anymore. For example:

    const actionsCreators = {
        addTodoItem: (state, { item }) => ({
            list: state.list.push(item)
        })
    };

You only need to change the action name from camel case into screaming snake case (`addTodoItem` => `ADD_TODO_ITEM`) to dispatch action.

    dispatch("ADD_TODO_ITEM", { item: item })

## Example

There are some examples app you can play with:

- [Todo App Example](https://github.com/minhtc/react-recontext/tree/master/examples/todos)
- [Audiobook React Native App](https://github.com/minhtc/sachnoiapp)
- ...

## Usage

Only **3 steps** to start with react-recontext

1.  Create **store.js**

```js
import createStore from "react-recontext";

// create app initial state
const initialState = {
    todos: []
};

// create app actions, all action type would be generated automatically
const actionsCreators = {
    toggleItem: (state, { todoId }) => ({
        todos: state.todos.map(
            todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
    })
};

// enable logger for debugging
const enableLogger = __DEV__

// createStore required 3 params, and return a recontext store
const store =  createStore(initialState, actionsCreators, enableLogger);

// export store
export store
```

2.  Wrap root component with Provider

- react:

```js
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
```

- react-native + react-nativation

```js
import { createStackNavigator } from "react-navigation";
import { Provider } from "./store";

const AppNavigator = createStackNavigator(...)

// wrap root component with <Provider /> that imported from recontext store
const App = () => (
    <Provider>
        <AppNavigator />
    </Provider>
);
```

3.  Connect component to get data and call action anywhere you want

```js
import React from "react";
import Todo from "./Todo";
import { connect, dispatch } from "./store";

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => dispatch("TOGGLE_ITEM", { todoId: todo.id })} // dispatch action type to update store value
      />
    ))}
  </ul>
);

const mapStateToProps = state => ({
  todos: state.todos
});

// connect component to get value from store
export default connect(mapStateToProps)(TodoList);
```

## Debugging

Supporting debugging by print all the store changes, example:

<center>

![Logger Example](https://github.com/minhtc/react-recontext/raw/master/screenshots/logger.gif "Logger Example")

</center>

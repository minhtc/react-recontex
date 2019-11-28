## react-recontext

[![npm version](https://badge.fury.io/js/react-recontext.svg)](https://badge.fury.io/js/react-recontext) [![CircleCI](https://circleci.com/gh/minhtc/react-recontext/tree/master.svg?style=svg)](https://circleci.com/gh/minhtc/react-recontext/tree/master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/minhtc/react-recontext/graphs/contributors)

A lightweight state management inspired by Flux, Redux, based on the latest React Context API.

SUPER simple and easy to build react, react-native application and flux architecture.

Following the Flux Architechture

## Installation

    npm install --save react-recontext

_or_

    yarn add react-recontext

## Api

_“Everything should be made as simple as possible, but no simpler.”_ - Einstein

1. **`createStore(initialState, actionsCreators, enableLogger)`**: of course, to create the app's root Store! 😗
   - **initialState**: vanilla or immutable js object, contains store default value.
   - **actionsCreators**: js object contains function to update store value
   - **enableLogger**: boolean flag for debugging
2. **`<Provider />`**: wrap the root Component.
   - The root component usually is `<App />` Component
3. **`connect(mapStateToProps)(Component)`**: connect React Component to Store, very easy to get value from store in any components.
   - **mapStateToProps**: a function to define which store values you want to inject into Component props
4. **`dispatch(actionType, params)`**: dispatch an event to update the Store value, from everywhere.
   - **actionType**: a string corresponding to the action name in `actionsCreators`
   - **params**: should be an object contains the value you want to update in 

## Example

There are some examples you can play with:

- Todo Example React Web: [![Edit react-recontext-todo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/weathered-dew-dr4x6?fontsize=14&hidenavigation=1&theme=dark)
- Todo Example React Native: [Todo App Example](https://snack.expo.io/@minhtc/react-recontext-demo)
- Web App Hackathon Team Matcher: [Hackathon team matcher](https://junctionxhanoi.meohack.com)
- React Native Audiobook: [Audiobook React Native App](https://github.com/minhtc/sachnoiapp)
- ...more is coming...

## Usage

Only **3 steps** to start with react-recontext

1.  Create **store.js**

```js
import createContext from "react-recontext";

export const { dispatch, Context, Provider } = createContext({
  displayName: "AppContext",
  initState: {
    todos: []
  },
  actions: {
    TOGGLE_ITEM: (state, { todoId }) => ({
      todos: state.todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    })
  }
});
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

3. Get data from store and call action anywhere you want

```js
import React from "react";
import Todo from "./Todo";
import { Context, dispatch } from "./store";

const TodoList = () => {
  const { todos } = React.useContext(Context);

  return (
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
};

export default TodoList;
```

## Debugging

Supporting debugging by print all the store changes, example:

<center>

![Logger Example](https://github.com/minhtc/react-recontext/raw/master/screenshots/logger.gif "Logger Example")

</center>
